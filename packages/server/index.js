const express = require('express');
const path = require('path');
const next = require('next');
const parseURL = require('url').parse;
//const routes = require('../lib/utils/routes')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const config = require('../lib/i18n/config');
const i18n = require('../lib/i18n');
const getAllNamespaces = require('../lib/i18n/get-all-namespaces');

const { localesPath, allLanguages, defaultLanguage, enableSubpaths } = config.translation;

const serverSideOptions = {
  fallbackLng: defaultLanguage,
  preload: allLanguages, // preload all langages
  ns: getAllNamespaces(`${localesPath}${defaultLanguage}`), // need to preload all the namespaces
  backend: {
    loadPath: path.join(__dirname, '/../../static/locales/{{lng}}/{{ns}}.json'),
    addPath: path.join(__dirname, '/../../static/locales/{{lng}}/{{ns}}.missing.json'),
  },
  detection: {
    caches: ['cookie'] // default: false
  },
};

if (enableSubpaths) {
  serverSideOptions.detection = {
    order: ['path', 'session', 'querystring', 'cookie', 'header'], // all
    caches: ['cookie'], // default false
    lookupPath: 'lng',
    lookupFromPathIndex: 0,
  };
  serverSideOptions.whitelist = allLanguages;
}

// init i18next with serverside settings
// using i18next-express-middleware
// init i18next with serverside settings
// using i18next-express-middleware
i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(serverSideOptions, () => {
    // loaded translations we can bootstrap our routes
    app.prepare().then(async () => {
      const { createServer, startServer } = require('./create-graphql-server')
      const graphqlServer = await createServer({dev})
      
      const server = graphqlServer.express;
      const cookieParser = require('cookie-parser');
      server.use(cookieParser())
      

/*

      server.use('/logout', function(req, res){
        res.clearCookie('Authorization')
        res.redirect(301, '/')
      })
*/
      // Force trailing slash on language subpaths
      if (enableSubpaths) {
        server.get(/\/((?!graphql|playground).)*/, (req, res, cb) => {
          const { pathname, search } = parseURL(req.url);
          const searchString = search || '';
          allLanguages.forEach(lng => {
            if (pathname.startsWith(`/${lng}`) && !pathname.startsWith(`/${lng}/`)) {
              res.redirect(301, pathname.replace(`/${lng}`, `/${lng}/`) + searchString);
            }
          });
          cb();
        });
      }

      // enable middleware for i18next
      server.use(i18nextMiddleware.handle(i18n));

      // serve locales for client
      server.use('/locales', express.static(path.join(__dirname, '/locales')));

      // missing keys
      server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));

      if (enableSubpaths) {
        server.get('*', (req, res, next) => {
          if (req.url === '/playground') return next();
          // If req.url contains a language subpath, remove
          // it so that NextJS will render the correct page
          let strippedRoute = req.url;
          for (const lng of allLanguages) {
            if (req.url.startsWith(`/${lng}/`)) {
              strippedRoute = strippedRoute.replace(`/${lng}/`, '/');
              break;
            }
          }
          if (strippedRoute !== req.url) {
            app.render(req, res, strippedRoute);
          } else {
            return handle(req, res);
          }
        });
      } else {
        server.get('*', (req, res, next) => {
          if (req.url === '/playground') return next();
          return handle(req, res)
        });
      }

      startServer(graphqlServer, 3000);
    });
  });
const express = require('express');
const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const config = require('../lib/i18n/config');
const i18n = require('../lib/i18n');
const getAllNamespaces = require('../lib/i18n/get-all-namespaces');
const { createReadStream } = require('fs');

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
      
      server.get('/sw.js', function(req, res, next){
        res.setHeader('content-type', 'text/javascript');
        createReadStream(path.join(__dirname, '../../offline/serviceWorker.js')).pipe(res);
      })
      // enable middleware for i18next
      server.use(i18nextMiddleware.handle(i18n));

      // serve locales for client
      server.use('/locales', express.static(path.join(__dirname, '/locales')));

      // missing keys
      server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));
      
      server.get('*', (req, res, next) => {
        if (req.url === '/playground') return next();
        return handle(req, res)
      });

      startServer(graphqlServer, 3000);
    });
  });
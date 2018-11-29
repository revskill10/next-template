const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const path = require('path');
const next = require('next');
const pathMatch = require('path-match')

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url')
const { join } = require('path')

const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const config = require('./modules/core/lib/i18n/config');
const i18n = require('./modules/core/lib/i18n');
const getAllNamespaces = require('./modules/core/lib/i18n/get-all-namespaces');

const { localesPath, allLanguages, defaultLanguage } = config.translation;

const serverSideOptions = {
  fallbackLng: defaultLanguage,
  preload: allLanguages, // preload all langages
  ns: getAllNamespaces(`${localesPath}${defaultLanguage}`), // need to preload all the namespaces
  backend: {
    loadPath: path.join(__dirname, './static/locales/{{lng}}/{{ns}}.json'),
    addPath: path.join(__dirname, './static/locales/{{lng}}/{{ns}}.missing.json'),
  },
  detection: {
    caches: ['cookie', 'querystring'] // default: false
  },
};
/*
const {
  makeRenderAndCache
} = require('./caching')
const renderAndCache = makeRenderAndCache(app, ssrCache)
*/


// init i18next with serverside settings
// using i18next-express-middleware
// init i18next with serverside settings
// using i18next-express-middleware

const route = pathMatch()
const matches = {
  playground: route('/playground'),
  sendNotification: route('/send-notification'),
  serviceWorker: route('/service-worker.js'),
  favicon: route('/favicon.ico'),
}
var MobileDetect = require('mobile-detect')    
i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(serverSideOptions, () => {
    // loaded translations we can bootstrap our routes
    app.prepare().then(async () => {
      //const routes = require('./configs/routes.config')
      const { createServer, startServer } = require('./modules/core/api/create-graphql-server')
      const urlMap = require('./configs/urlMap.config')
      const createSchema = require('./modules/core/api/create-schema')
      const localSchema = require('./configs/schema.config')
      const {schema, adminClients} = await createSchema(urlMap, localSchema.schema)
      const graphqlServer = await createServer({dev, schema, adminClients, getCurrentUser: localSchema.getCurrentUser(adminClients)})
      
      const server = graphqlServer.express;
      const cookieParser = require('cookie-parser');
      server.use(cookieParser())
      
      // enable middleware for i18next
      server.use(i18nextMiddleware.handle(i18n));
/*
      routes.forEach(function(item) {
        server.get(item, (req, res) => {
          renderAndCache(req, res, item)
        })
      })
*/
      // serve locales for client
      server.use('/locales', express.static(path.join(__dirname, '/locales')));

      // missing keys
      server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));

      server.get('*', (req, res, next) => {
        const parsedUrl = parse(req.url, true)
        const { pathname, query } = parsedUrl

        if (pathname.includes('static/wasm')) {
          res.setHeader('Content-Type', 'application/wasm')
          handle(req, res, parsedUrl)
        }

        if (matches.playground(pathname) || matches.sendNotification(pathname)) {
          return next();
        } else if (matches.serviceWorker(pathname)) {
          const filePath = process.env.NODE_ENV === 'production' ? join(__dirname, './static', 'service-worker.js') : join(__dirname, './static', 'service-worker.dev.js')
          app.serveStatic(req, res, filePath)
        } else if (matches.favicon(pathname)) {
          const filePath = join(__dirname, './static', 'favicon.ico')
          app.serveStatic(req, res, filePath)
        } else {
          let md = new MobileDetect(req.headers['user-agent']);
          
          if (!md.mobile()) {
            app.render(req, res, '/index', Object.assign({phone: false}, query))
          } else {
            app.render(req, res, '/index.mobile', Object.assign({phone: true}, query))
          }
          
          //handle(req, res, parsedUrl)
          //app.render(req, res, '/', Object.assign(params, query))
        }
      });

      startServer(graphqlServer, 3000);
    });
  });
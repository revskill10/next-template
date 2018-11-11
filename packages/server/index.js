const dotenv = require('dotenv')
dotenv.config()
const express = require('express');
const path = require('path');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const { parse } = require('url')
const { join } = require('path')

const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const config = require('../lib/i18n/config');
const i18n = require('../lib/i18n');
const getAllNamespaces = require('../lib/i18n/get-all-namespaces');

const { localesPath, allLanguages, defaultLanguage } = config.translation;

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
      
      // enable middleware for i18next
      server.use(i18nextMiddleware.handle(i18n));

      // serve locales for client
      server.use('/locales', express.static(path.join(__dirname, '/locales')));

      // missing keys
      server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n));
      
      server.get('*', (req, res, next) => {
        if (req.url === '/playground' || req.url === '/send-notification' ) return next();
        const parsedUrl = parse(req.url, true)
        const { pathname } = parsedUrl

        if (pathname === '/service-worker.js') {
          const filePath = process.env.NODE_ENV === 'production' ? join(__dirname, '../../static', 'service-worker.js') : join(__dirname, '../../static', 'service-worker.dev.js')
          app.serveStatic(req, res, filePath)
        } else if (pathname === '/favicon.ico') {
          app.serveStatic(req, res, '../../static/favicon.ico')
        } else {
          handle(req, res, parsedUrl)
        }
      });

      startServer(graphqlServer, 3000);
    });
  });
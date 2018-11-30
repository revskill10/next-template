const dotenv = require('dotenv')
dotenv.config()
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const {
  routesMiddleware,
  cookieParserMiddleware,
  rateLimiterMiddleware,
  initI18n,
  i18nMiddleware,
} = require('./middlewares')

const {
  urlMap,
  localSchema
} = require('./configs')

const {
  createApiServer,
  startServer,
} = require('./modules')

const i18next = initI18n()
const {i18n, Backend, i18nextMiddleware, serverSideOptions} = i18next
i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(serverSideOptions, () => {
    app.prepare().then(async () => {
      const graphqlServer = await createApiServer({urlMap, localSchema, dev})
      const server = graphqlServer.express
      rateLimiterMiddleware({server, dev})
      cookieParserMiddleware({server})
      i18nMiddleware({server, i18next})
      routesMiddleware({server, handle, app, dev})
      
      startServer(graphqlServer, 3000);
    });
  });
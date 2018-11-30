const {routesMiddleware} = require('./routes')
const {cookieParserMiddleware} = require('./cookie-parser')
const {rateLimiterMiddleware} = require('./rate-limit')
const {initI18n, i18nMiddleware} = require('./i18n')

module.exports = {
  routesMiddleware,
  cookieParserMiddleware,
  rateLimiterMiddleware,
  initI18n,
  i18nMiddleware,
}

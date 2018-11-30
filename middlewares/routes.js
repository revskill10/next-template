const { parse } = require('url')
const { join } = require('path')
const pathMatch = require('path-match')
const route = pathMatch()

function routesMiddleware({server, handle, app, dev}) {
  const routes = require('../configs/routes.config')
  const MobileDetect = require('mobile-detect')
  server.get('*', (req, res, next) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl
    
    const md = new MobileDetect(req.headers['user-agent']);
    const isMobile = md.mobile()
    for (let k in routes) {
      if (routes.hasOwnProperty(k)) {
        const params = route(k)(pathname)
        if (params) {
          return routes[k]({app, req, res, next, handle, query, pathname, isMobile, join, params, dev})
        }
      }
    }
  });
}

module.exports = {
  routesMiddleware
}
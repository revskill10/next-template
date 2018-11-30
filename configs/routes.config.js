/*
//const pathToRegexp = require('path-to-regexp')
//const url = require('url')
function routes() {
  /*
  const nowRoutes = {
    "routes": [
      { "src": "/w/(.*)", "dest": "/work?slug=$1" },
      { "src": ""}
    ]
  }
  let nowConfig = {}

  nowRoutes.routes.forEach(function(item) {
    nowConfig[item.src] = function({app, req, res, parsedUrl, handle}) {
      const { query } = parsedUrl
      var re = pathToRegexp(item.src)
      const result = re.exec(req.url)
      if (result) {
        const slices = result.slice(1, result.length)
        let tmp = item.dest
        for(let i = 0; i < slices.length; i++) {
          tmp = tmp.replace(`$${i+1}`, slices[i])
        }
        const t = url.parse(tmp, true)
        const finalQuery = {...t.query, ...query}
        console.log(inspect(finalQuery))
        app.render(req, res, t.pathname, finalQuery)
      } else {
        handle(req, res, parsedUrl)
      }
    }
  })
  

  return

module.exports = routes
*/
module.exports = {
  '/playground': function({next}) {
    return next();
  },
  '/send-notification': function({next}) {
    return next();
  },
  '/service-worker.js': function({app, req, res, join, dev}) {
    const filePath = dev ? join(__dirname, '../static', 'service-worker.dev.js'): join(__dirname, '../static', 'service-worker.js')
    app.serveStatic(req, res, filePath)
  },
  '/favicon.ico': function({app, req, res, join}) {
    const filePath = join(__dirname, '../static', 'favicon.ico')
    app.serveStatic(req, res, filePath)
  },
  '/static/wasm/*': function({app, req, res, next, handle, pathname}) {
    res.setHeader('Content-Type', 'application/wasm')
    handle(req, res, parsedUrl)
  },
  '/w/:slug': function({app, req, res, query, params}) {
    const {slug} = params
    app.render(req, res, '/work', {slug, ...query})
  },
  '/*': function({app, req, res, isMobile, query}) {
    if (!isMobile) {
      app.render(req, res, '/index', {phone: false, ...query })
    } else {
      app.render(req, res, '/index', {phone: true, ...query})
    }
  },
}

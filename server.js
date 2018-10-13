const express = require('express')
const path = require('path')
const next = require('next')
const { join } = require('path')
const { parse } = require('url')
const LRUCache = require('lru-cache')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const i18nextMiddleware = require('i18next-express-middleware')
const Backend = require('i18next-node-fs-backend')
const i18n = require('./lib/i18n')
const ssrCache = new LRUCache({
  max: 100,
  maxAge: 1000 * 60 * 60 // 1hour
})
// init i18next with serverside settings
// using i18next-express-middleware
i18n
  .use(Backend)
  .use(i18nextMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    preload: ['en', 'vi'], // preload all langages
    ns: ['common'], // need to preload all the namespaces
    backend: {
      loadPath: path.join(__dirname, '/static/locales/{{lng}}/{{ns}}.json'),
      addPath: path.join(__dirname, '/static/locales/{{lng}}/{{ns}}.missing.json')
    }
  }, () => {
    // loaded translations we can bootstrap our routes
    app.prepare()
      .then(() => {
        const server = express()

        // enable middleware for i18next
        server.use(i18nextMiddleware.handle(i18n))        

        // serve locales for client
        server.use('/locales', express.static(path.join(__dirname, '/static/locales')))

        // missing keys
        server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))


        // Use the `renderAndCache` utility defined below to serve pages
        server.get('/', (req, res) => {
          renderAndCache(req, res, '/')
        })

        // Use the `renderAndCache` utility defined below to serve pages
        server.get('/about', (req, res) => {
          renderAndCache(req, res, '/about')
        })

        server.get('/admin', (req, res) => {
          renderAndCache(req, res, '/admin')
        })
        // use next.js
        server.get('*', (req, res) => {
          const parsedUrl = parse(req.url, true)
          const { pathname } = parsedUrl

          if (pathname === '/service-worker.js') {
            const filePath = join(__dirname, '.next', pathname)
            app.serveStatic(req, res, filePath)
          } else {
            handle(req, res, parsedUrl)
          }
        })

        server.listen(3000, (err) => {
          if (err) throw err
          console.log('> Ready on http://localhost:3000')
        })
      })
  })


  /*
 * NB: make sure to modify this to take into account anything that should trigger
 * an immediate page change (e.g a locale stored in req.session)
 */
function getCacheKey (req) {
  return `${req.url}`
}

async function renderAndCache (req, res, pagePath, queryParams) {
  const key = getCacheKey(req)

  // If we have a page in the cache, let's serve it
  if (ssrCache.has(key)) {
    res.setHeader('x-cache', 'HIT')
    res.send(ssrCache.get(key))
    return
  }

  try {
    // If not let's render the page into HTML
    const html = await app.renderToHTML(req, res, pagePath, queryParams)

    // Something is wrong with the request, let's skip the cache
    if (res.statusCode !== 200) {
      res.send(html)
      return
    }

    // Let's cache this page
    ssrCache.set(key, html)

    res.setHeader('x-cache', 'MISS')
    res.send(html)
  } catch (err) {
    app.renderError(err, req, res, pagePath, queryParams)
  }
}
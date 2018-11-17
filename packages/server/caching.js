function getCacheKey (req) {
  return `${req.url}`
}

function makeRenderAndCache(app, ssrCache) {
  return async function renderAndCache (req, res, pagePath, queryParams) {
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
}

module.exports = {
  makeRenderAndCache,
}

const {join} = require('path')
module.exports = {
  server: {
    analyzerMode: 'static',
    reportFilename: join(__dirname, '../bundles/server.html')
  },
  browser: {
    analyzerMode: 'static',
    reportFilename: join(__dirname, '../bundles/client.html')
  }
}

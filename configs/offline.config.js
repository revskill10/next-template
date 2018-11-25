const {join} = require('path')
const offlineOptions = {
  dontAutoRegisterSw: true,
  devSwSrc: join(__dirname, '../static/service-worker.dev.js')
}

module.exports = offlineOptions

//const routes = require('./routes.config')
module.exports = function () {
  const res = {'/': {page: '/index'}}
  //routes.forEach(element => {
  //  res[element] = {page: element}
  //});
  return res
}

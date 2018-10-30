const soap = require('strong-soap').soap;

async function createSoapClient(url, options={}) {  
  return new Promise(function (resolve, reject) {
    soap.createClient(url, options, function(err, client) {
      if (err) {
        return reject(err)
      } else {
        return resolve(client)
      }
    })
  })
}

module.exports = {
  createSoapClient,
}
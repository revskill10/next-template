const cookieParser = require('cookie-parser');

function cookieParserMiddleware({server}) {  
  server.use(cookieParser())
}
      
module.exports = {
  cookieParserMiddleware
}

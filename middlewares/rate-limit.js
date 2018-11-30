function rateLimiterMiddleware({server, dev}) {
  const limiterConfig = require('../configs/rate-limiter.config')
  if (!dev) {
    const rateLimit = require("express-rate-limit");
    server.enable("trust proxy"); 
    const limiter = rateLimit(limiterConfig);
    
    //  apply to all requests
    server.use(limiter);
  }
}
module.exports = {
  rateLimiterMiddleware
}


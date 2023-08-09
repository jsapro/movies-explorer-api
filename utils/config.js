const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

const {
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT = 3000,
} = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
  PORT,
  rateLimiter,
};

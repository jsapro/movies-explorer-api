const {
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
  PORT = 3005,
} = process.env;

module.exports = {
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
  PORT,
};

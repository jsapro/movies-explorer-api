require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { MONGO_URL, PORT, rateLimiter } = require('./utils/config');
const router = require('./routes');
const { finalErrorHandler } = require('./middlewares/finalErrorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log('Подключено к базе данных bitfilmsdb');
  })
  .catch((err) => {
    console.log(`Ошибка mongoose.connect: ${err.message}`);
  });

// помогает защитить приложение от веб-уязвимостей путем соответствующей настройки заголовков HTTP
app.use(helmet());
app.use(rateLimiter); // Apply the rate limiting middleware to all requests

app.use(express.json()); // вместо bodyParser
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(router);

app.use(errorLogger);
app.use(errors()); // обработчик ошибок celebrate
app.use(finalErrorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});

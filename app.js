require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const { MONGO_URL, PORT } = require('./utils/config');
const router = require('./routes');
const { finalErrorHandler } = require('./middlewares/finalErrorHandler');

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

app.use(express.json()); // вместо bodyParser
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errors()); // обработчик ошибок celebrate
app.use(finalErrorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту: ${PORT}`);
});

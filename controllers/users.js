const { constants } = require('http2');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET, NODE_ENV } = require('../utils/config');
const BadRequestErr = require('../utils/errors/BadRequestErr');
const ConflictErr = require('../utils/errors/ConflictErr');
const NotFoundErr = require('../utils/errors/NotFoundErr');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'key-for-token',
        {
          expiresIn: '7d',
        },
      );
      res.send({ data: token });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports.register = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      req.body.password = hash;

      return User.create(req.body);
    })
    .then((user) => {
      const { name, email } = user;
      res.status(constants.HTTP_STATUS_CREATED).send({ data: { name, email } });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new BadRequestErr('Переданы некорректные данные при создании фильма'),
        );
      }
      if (err.code === 11000) {
        return next(
          new ConflictErr('Пользователь с данным e-mail уже зарегистрирован'),
        );
      }
      return next(err);
    });
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) return res.send({ data: user });
      return new NotFoundErr('Пользователь по указанному _id не найден');
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(
          new BadRequestErr(
            'Переданы некорректные данные для поиска пользователя',
          ),
        );
      }
      return next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) return res.send({ data: user });
      return next(new NotFoundErr('Пользователь с указанным _id не найден'));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(
          new BadRequestErr(
            'Переданы некорректные данные при обновлении профиля',
          ),
        );
      }
      return next(err);
    });
};

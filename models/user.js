const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnAuthorizedErr = require('../utils/errors/UnAuthorizedErr');

const handleError = () => {
  throw new UnAuthorizedErr('Неправильные почта или пароль');
};

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (email) => validator.isEmail(email),
        message: 'Неправильный формат почты',
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  {
    statics: {
      findUserByCredentials(email, password) {
        return this.findOne({ email })
          .select('+password')
          .then((user) => {
            if (!user) return Promise.reject(handleError());
            return bcrypt.compare(password, user.password).then((matched) => {
              if (!matched) return Promise.reject(handleError());
              return user;
            });
          });
      },
    },
  },
  {
    versionKey: false,
  },
);

module.exports = mongoose.model('user', userSchema);

const mongoose = require('mongoose');
const { constants } = require('http2');
const Movie = require('../models/movie');
const BadRequestErr = require('../utils/errors/BadRequestErr');
const NotFoundErr = require('../utils/errors/NotFoundErr');
const ForbiddenErr = require('../utils/errors/ForbiddenErr');

module.exports.getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId })
    .then((movies) => res.send({ data: movies }))
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  Movie.create({ owner: req.user._id, ...req.body }).then((movie) => {
    res
      .status(constants.HTTP_STATUS_CREATED)
      .send({ data: movie })
      .catch((err) => {
        if (err instanceof mongoose.Error.ValidationError) {
          return next(
            new BadRequestErr(
              'Переданы некорректные данные при создании фильма'
            )
          );
        }
        return next(err);
      });
  });
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(new NotFoundErr('Фильм с указанным _id не найден'))
    .then((movie) => {
      if (movie.owner.toString() !== req.user._id) {
        return next(new ForbiddenErr('Удалять можно только свои фильмы'));
      }
      return movie.deleteOne().then(() => res.send({ data: movie }));
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return new BadRequestErr(
          'Переданы некорректные данные для получения фильма'
        );
      }
      return next(err);
    });
};

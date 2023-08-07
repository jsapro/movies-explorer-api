const movieRouter = require('express').Router();
const {
  validateMovie,
  validateMovieId,
} = require('../utils/celebrateValidation');

// movieRouter.get('/', getMovies);
// movieRouter.post('/', validateMovie, postMovie);
// movieRouter.delete('/:_id', validateMovieId, deleteMovie);

module.exports = movieRouter;

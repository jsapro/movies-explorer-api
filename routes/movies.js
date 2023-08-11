const movieRouter = require('express').Router();
const {
  validateMovie,
  validateMovieId,
} = require('../utils/celebrateValidation');
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateMovie, postMovie);
movieRouter.delete('/:movieId', validateMovieId, deleteMovie);

module.exports = movieRouter;

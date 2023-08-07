const movieRouter = require('express').Router();

movieRouter.get('/', getMovies);
movieRouter.post('/', validateMovie, postMovie);
movieRouter.delete('/_id', validateMovieId, deleteMovie);

module.exports = movieRouter;




const movieRouter = require('express').Router();

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', validateMovie, postMovie);
movieRouter.delete('/movies/_id', validateMovieId, deleteMovie);

module.exports = movieRouter;




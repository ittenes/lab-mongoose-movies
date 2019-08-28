const express = require('express');

const Movie = require('../models/Movie');

const router = express.Router();

/* GET movie listing. */
router.get('/', (req, res, next) => {
  Movie.find()
    .then((movies) => {
      console.log(movies);
      res.render('./movies/index', { movies });
    })
    .catch(next);
});

/* GET form for new movie. */
router.get('/new', (req, res, next) => {
  res.render('./movies/new');
});

/* POST form for new movie. */
router.post('/', (req, res, next) => {
  const { title, genere, plot } = req.body;

  Movie.create({ title, genere, plot })
    .then((movie) => {
      console.log(movie);
      res.redirect('/movies');
    })
    .catch(next);
});

/* POST delete a movie. */
router.post('/:movieId/delete', (req, res, next) => {
  const { movieId } = req.params;
  Movie.findByIdAndRemove(movieId)
    .then(() => {
      res.redirect('/movies');
    })
    .catch(next);
});

/* GET movie edit by ID. */
router.get('/:movieId/edit', (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      console.log(movie);
      res.render('./movies/edit', { movie });
    })
    .catch(next);
});
/* POST EDIT movie edit by ID. */
router.post('/:movieId', (req, res, next) => {
  const { movieId } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  Movie.findByIdAndUpdate(movieId, {
    $set: { name, occupation, catchPhrase },
  })
    .then((movie) => {
      res.redirect(`/movies/${movieId}`);
    })
    .catch(next);
});

/* GET movie ID. */
router.get('/:movieId', (req, res, next) => {
  const { movieId } = req.params;

  Movie.findById(movieId)
    .then((movie) => {
      console.log(movie);
      res.render('./movies/show', { movie });
    })
    .catch(next);
});

module.exports = router;

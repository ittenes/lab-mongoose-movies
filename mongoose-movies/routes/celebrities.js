const express = require('express');

const Celebrity = require('../models/Celebrity');

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  Celebrity.find()
    .then((celebrities) => {
      console.log(celebrities);
      res.render('./celebrities/index', { celebrities });
    })
    .catch(next);
});

/* GET form for new celebrity. */
router.get('/new', (req, res, next) => {
  res.render('./celebrities/new');
});

/* POST form for new celebrity. */
router.post('/', (req, res, next) => {
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.create({ name, occupation, catchPhrase })
    .then((celebrity) => {
      console.log(celebrity);
      res.redirect('/celebrities');
    })
    .catch(next);
});

/* POST delete a celebrity. */
router.post('/:celebrityId/delete', (req, res, next) => {
  const { celebrityId } = req.params;
  Celebrity.findByIdAndRemove(celebrityId)
    .then(() => {
      res.redirect('/celebrities');
    })
    .catch(next);
});

/* GET users edit by ID. */
router.get('/:celebrityId/edit', (req, res, next) => {
  const { celebrityId } = req.params;

  Celebrity.findById(celebrityId)
    .then((celebrity) => {
      console.log(celebrity);
      res.render('./celebrities/edit', { celebrity });
    })
    .catch(next);
});
/* POST EDIT users edit by ID. */
router.post('/:celebrityId', (req, res, next) => {
  const { celebrityId } = req.params;
  const { name, occupation, catchPhrase } = req.body;

  Celebrity.findByIdAndUpdate(celebrityId, {
    $set: { name, occupation, catchPhrase },
  })
    .then((celebrity) => {
      res.redirect(`/celebrities/${celebrityId}`);
    })
    .catch(next);
});

/* GET users ID. */
router.get('/:celebrityId', (req, res, next) => {
  const { celebrityId } = req.params;

  Celebrity.findById(celebrityId)
    .then((celebrity) => {
      console.log(celebrity);
      res.render('./celebrities/show', { celebrity });
    })
    .catch(next);
});

module.exports = router;

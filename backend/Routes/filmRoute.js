const express = require('express');
const router = express.Router();

const {
  getAllFilms,
  getFilmByActor,
  getFilmByActorName,
  getFilmByTitle,
  getFilmByWordInTitle,
  getFilmByMotCle
} = require('../Controllers/filmController');

// Routes cohérentes et en camelCase
router.get('/all_films', getAllFilms);
router.get('/filmByActor/:actor', getFilmByActor);
router.get('/filmByActorName/:actorName', getFilmByActorName);
router.get('/filmByTitle/:title', getFilmByTitle);
router.get('/filmByWordInTitle/:word', getFilmByWordInTitle);
router.get('/filmByMotCle/:motCle', getFilmByMotCle);

module.exports = router;

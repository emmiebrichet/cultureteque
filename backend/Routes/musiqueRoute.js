const express = require('express');
const router = express.Router();

const {
  getAllMusique,
  getMusiqueByArtist,
  getMusiqueByArtistName,
  getMusiqueByAlbum,
  getMusiqueByWordInAlbum,
  getMusiqueByMotCle,
  getMusiqueByGenre
} = require('../Controllers/musiqueController');

// Routes avec noms cohérents en français et en camelCase

router.get('/musiqueByArtist/:artist', getMusiqueByArtist);
router.get('/musiqueByArtistName/:artistName', getMusiqueByArtistName);
router.get('/musiqueByMotCle/:motCle', getMusiqueByMotCle);
router.get('/musiqueByGenre/:genre', getMusiqueByGenre);

module.exports = router;

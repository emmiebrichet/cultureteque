const express = require('express');
const router = express.Router();

const {
  getLivreByAuthor,
  getLivreByAuthorName,
  getLivreByTitle,
  getLivreByWordInTitle,
  getLivreByMotCle,
  getLivreByGenre,
  getAllLivres,
  getPremierParGenre
} = require('../Controllers/LivreController');

router.get('/allLivres', getAllLivres);
router.get('/premierParGenre', getPremierParGenre); // <-- nouvelle route
router.get('/livreByAuthor/:author', getLivreByAuthor);
router.get('/livreByAuthorName/:authorName', getLivreByAuthorName);
router.get('/livreByTitle/:title', getLivreByTitle);
router.get('/livreByWordInTitle/:word', getLivreByWordInTitle);
router.get('/livreByMotCle/:motCle', getLivreByMotCle);
router.get('/livreByGenre/:genre', getLivreByGenre);

module.exports = router;

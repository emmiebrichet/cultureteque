const express = require('express');
const router = express.Router();

const {
  getAllLivres,
  getLivreByAuthor,
  getLivreByAuthorName,
  getLivreByTitle,
  getLivreByWordInTitle,
  getLivreByMotCle,
  getLivreByGenre
} = require('../Controllers/LivreController');

// Routes claires et en camelCase
router.get('/all_livres', getAllLivres);
router.get('/livreByAuthor/:author', getLivreByAuthor);
router.get('/livreByAuthorName/:authorName', getLivreByAuthorName);
router.get('/livreByTitle/:title', getLivreByTitle);
router.get('/livreByWordInTitle/:word', getLivreByWordInTitle);
router.get('/livreByMotCle/:motCle', getLivreByMotCle);
router.get('/livreByGenre/:genre', getLivreByGenre);

module.exports = router;

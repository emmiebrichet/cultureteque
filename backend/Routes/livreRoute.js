const express = require('express');
const router = express.Router();

const {
  getAllLivres,
  getLivreByAuthor,
  getLivreByAuthorName,
  getLivreByTitle,
  getLivreByWordInTitle,
  getLivreByMotCle
} = require('../Controllers/livreController');

// Routes claires et en camelCase
router.get('/all_livres', getAllLivres);
router.get('/livreByAuthor/:author', getLivreByAuthor);
router.get('/livreByAuthorName/:authorName', getLivreByAuthorName);
router.get('/livreByTitle/:title', getLivreByTitle);
router.get('/livreByWordInTitle/:word', getLivreByWordInTitle);
router.get('/livreByMotCle/:motCle', getLivreByMotCle);

module.exports = router;

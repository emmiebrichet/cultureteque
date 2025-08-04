const db = require('../config/config');

// Get all books
exports.getAllLivres = (req, res) => {
  const query = 'SELECT * FROM livres';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    return res.json(results);
  });
};

// Get book by author (exact match)
exports.getLivreByAuthor = (req, res) => {
  const author = req.params.author;
  const query = 'SELECT * FROM livres WHERE auteur = ?';

  db.query(query, [author], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: `Aucun livre trouvé pour l'auteur "${author}"` });
    }
    return res.json(results);
  });
};

// Get book by author name (partial match)
exports.getLivreByAuthorName = (req, res) => {
  const authorName = req.params.authorName;
  const query = 'SELECT * FROM livres WHERE auteur LIKE ?';

  db.query(query, [`%${authorName}%`], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: `Aucun livre trouvé pour un auteur correspondant à "${authorName}"` });
    }
    return res.json(results);
  });
};

// Get book by exact title
exports.getLivreByTitle = (req, res) => {
  const title = req.params.title;
  const query = 'SELECT * FROM livres WHERE titre = ?';

  db.query(query, [title], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: `Aucun livre trouvé avec le titre "${title}"` });
    }
    return res.json(results);
  });
};

// Get book by a word in title (partial match)
exports.getLivreByWordInTitle = (req, res) => {
  const word = req.params.word;
  const query = 'SELECT * FROM livres WHERE titre LIKE ?';

  db.query(query, [`%${word}%`], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: `Aucun livre trouvé avec le mot "${word}" dans le titre` });
    }
    return res.json(results);
  });
};

// Get book by motCle (keyword) in multiple columns
exports.getLivreByMotCle = (req, res) => {
  const motCle = req.params.motCle;
  const query = `
    SELECT * FROM livres 
    WHERE (
      (motscle1 IS NOT NULL AND motscle1 != '' AND motscle1 LIKE ?) 
      OR (motscle2 IS NOT NULL AND motscle2 != '' AND motscle2 LIKE ?) 
      OR (motscle3 IS NOT NULL AND motscle3 != '' AND motscle3 LIKE ?) 
      OR (motscle4 IS NOT NULL AND motscle4 != '' AND motscle4 LIKE ?) 
      OR (motscle5 IS NOT NULL AND motscle5 != '' AND motscle5 LIKE ?)
    )
  `;
  const motCleLike = `%${motCle}%`;

  db.query(query, [motCleLike, motCleLike, motCleLike, motCleLike, motCleLike], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: `Aucun livre trouvé avec le mot clé "${motCle}"` });
    }
    return res.json(results);
  });
};
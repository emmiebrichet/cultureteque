const db = require('../config/config');

// Get all series
exports.getAllSerie = (req, res) => {
  const query = 'SELECT * FROM series';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
};

// Get serie by actor (exact match)
exports.getSerieByActor = (req, res) => {
  const actor = req.params.actor;
  const query = 'SELECT * FROM series WHERE acteur = ?';

  db.query(query, [actor], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
};

// Get serie by actor name (partial match)
exports.getSerieByActorName = (req, res) => {
  const actorName = req.params.actorName;
  const query = 'SELECT * FROM series WHERE acteur LIKE ?';

  db.query(query, [`%${actorName}%`], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
};

// Get serie by title (exact match)
exports.getSerieByTitle = (req, res) => {
  const title = req.params.title;
  const query = 'SELECT * FROM series WHERE titre = ?';

  db.query(query, [title], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
};

// Get serie by a word in title (partial match)
exports.getSerieByWordInTitle = (req, res) => {
  const word = req.params.word;
  const query = 'SELECT * FROM series WHERE titre LIKE ?';

  db.query(query, [`%${word}%`], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
};

// Get serie by mot cle
exports.getSerieByMotCle = (req, res) => {
  const motCle = req.params.motCle;
  const query = `
    SELECT * FROM series 
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
    res.json(results);
  });
};

//Get serie by Genre
exports.getSerieByGenre = (req, res) => {
  const genre = req.params.genre;
  const query = 'SELECT * FROM series WHERE genre = ?';

  db.query(query, [genre], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
};

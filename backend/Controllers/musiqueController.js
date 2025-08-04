const db = require('../config/config');

// Get all musiques
exports.getAllMusique = (req, res) => {
  const query = 'SELECT * FROM musiques';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
};

// Get musique by artist (exact match)
exports.getMusiqueByArtist = (req, res) => {
  const artist = req.params.artist;
  const query = 'SELECT * FROM musiques WHERE artiste = ?';

  db.query(query, [artist], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
};

// Get musique by artist name (partial match)
exports.getMusiqueByArtistName = (req, res) => {
  const artistName = req.params.artistName;
  const query = 'SELECT * FROM musiques WHERE artiste LIKE ?';

  db.query(query, [`%${artistName}%`], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
};

// Get musique by album (exact match)
exports.getMusiqueByAlbum = (req, res) => {
  const album = req.params.album;
  const query = 'SELECT * FROM musiques WHERE album = ?';

  db.query(query, [album], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
};

// Get musique by a word in album (partial match)
exports.getMusiqueByWordInAlbum = (req, res) => {
  const word = req.params.word;
  const query = 'SELECT * FROM musiques WHERE album LIKE ?';

  db.query(query, [`%${word}%`], (err, results) => {
    if (err) {
      console.error('Erreur SQL:', err);
      return res.status(500).json({ message: 'Erreur serveur' });
    }
    res.json(results);
  });
};

// Get musique by mot clé
exports.getMusiqueByMotCle = (req, res) => {
  const motCle = req.params.motCle;
  const query = `
    SELECT * FROM musiques 
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

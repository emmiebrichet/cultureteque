const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost', // ou autre
  user: 'root',      // ton utilisateur
  password: '',      // ton mot de passe
  database: 'Cultureteque'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur de connexion à la base:', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

module.exports = db;

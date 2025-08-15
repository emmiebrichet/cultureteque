const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'BuckyNat',
  database: 'cultureteque'
});

db.connect((err) => {
  if (err) {
    console.error('Erreur connexion à la BDD :', err);
    return;
  }
  console.log('Connecté à la BDD MySQL');
});

module.exports = db;

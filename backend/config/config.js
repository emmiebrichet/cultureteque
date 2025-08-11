const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize('Cultureteque', 'root', 'BuckyNat', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => {
    console.log('Connecté à MySQL avec Sequelize');
  })
  .catch(err => {
    console.error('Erreur de connexion :', err);
  });

module.exports = sequelize;

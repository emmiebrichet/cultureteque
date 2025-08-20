const express = require('express');
const cors = require('cors');
const { sequelize } = require('./backend/models');

const livreRoutes = require('./backend/Routes/livreRoute');
const musiqueRoutes = require('./backend/Routes/musiqueRoute');
const filmRoutes = require('./backend/Routes/filmRoute');
const serieRoutes = require('./backend/Routes/serieRoute');

const app = express();
const PORT = 2424;

// Middleware CORS
app.use(cors());

// Middleware JSON
app.use(express.json());

// Fichiers statiques (ton front)
app.use(express.static('frontend'));

// Routes API (toutes tes routes de livres seront sous /livres)
app.use('/livres', livreRoutes);
app.use('/musiques', musiqueRoutes);
app.use('/films', filmRoutes);
app.use('/series', serieRoutes);

// Route de test
app.get('/api', (req, res) => {
    res.json({ message: "Bienvenue sur l'API de mon projet" });
});

// Synchronisation Sequelize + démarrage serveur
sequelize.sync({ alter: true })
  .then(() => {
    console.log("📦 Tables synchronisées avec Sequelize");
    app.listen(PORT, () => {
      console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error("❌ Erreur de synchronisation :", err);
  });

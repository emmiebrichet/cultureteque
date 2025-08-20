const express = require('express');
const cors = require('cors');

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

// Routes API
app.use('/livres', livreRoutes);
app.use('/musiques', musiqueRoutes);
app.use('/films', filmRoutes);
app.use('/series', serieRoutes);

// Route de test
app.get('/api', (req, res) => {
    res.json({ message: "Bienvenue sur l'API de mon projet (sans Sequelize)" });
});

// Démarrage du serveur (sans Sequelize)
app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
});

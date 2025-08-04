const express = require('express');
const app = express();
const livreRoutes = require('./backend/Routes/livreRoute');
const musiqueRoutes = require('./backend/Routes/musiqueRoute');
const filmRoutes = require('./backend/Routes/filmRoute');
const serieRoutes = require('./backend/Routes/serieRoute');

// Middleware pour parser le JSON
app.use(express.json());

// Servir les fichiers frontend statiques
app.use(express.static('frontend'));

// Utiliser les routes /livres
app.use('/livres', livreRoutes);
app.use('/musiques', musiqueRoutes);
app.use('/films', filmRoutes);
app.use('/series', serieRoutes);

// Route test API
app.get('/api', (req, res) => {
    res.json({ message: "Bienvenue sur l'API de mon projet" });
});

// Démarrage du serveur
app.listen(2424, () => {
    console.log("Serveur démarré sur http://localhost:2424");
});

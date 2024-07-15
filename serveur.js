// Import des modules nécessaires
const express = require('express');
const userRoute = require('./routes/user'); // Import de votre route utilisateur
require('./config/connect');
const cors = require('cors');
 // Import de votre configuration de connexion

// Initialisation de l'application Express
const app = express();

// Middleware pour parser les requêtes JSON
app.use(express.json());
app.use(cors());

// Middleware pour utiliser la route utilisateur à l'URL '/user'
app.use('/user', userRoute);

// Écoute du serveur sur le port 4000
const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

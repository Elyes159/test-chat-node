const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/stockInMongo', async (req, res) => {
    try {
        const { email, nom, idTwitter } = req.body;

        // Vérifier si l'utilisateur existe déjà dans la base de données
        let existingUser = await User.findOne({ idTwitter });

        if (existingUser) {
            // Si l'utilisateur existe déjà, renvoyer un message indiquant qu'il existe
            return res.status(409).json({ message: 'L\'utilisateur existe déjà' });
        }

        // Si l'utilisateur n'existe pas, ajouter un nouvel utilisateur
        const newUser = new User({
            email,
            nom,
            idTwitter
        });

        // Sauvegarde de l'utilisateur dans la base de données
        const savedUser = await newUser.save();

        // Réponse avec le nouvel utilisateur enregistré
        res.status(201).json(savedUser);
    } catch (error) {
        // Gestion des erreurs : envoi d'une réponse avec le statut 400 en cas d'erreur
        if (error.code === 11000 && error.keyPattern && error.keyPattern.username === 1) {
            // Si c'est une erreur de contrainte unique (duplicate key error)
            return res.status(400).json({ message: 'Ce nom d\'utilisateur existe déjà.' });
        }
        res.status(400).send(error.message);
    }
});

module.exports = router;

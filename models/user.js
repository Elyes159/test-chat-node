// Modèle User (exemples)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    email: { type: String, required: false },
    nom: { type: String, required: false },
    idTwitter: { type: String, required: false }
});

const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose');

const exerciceSchema = mongoose.Schema({
  titre: { type: String, required: true },
  enonce: { type: String, required: true },
  correct: { type: String, required: true },
  false1: { type: String, required: true },
  false2: { type: String, required: true },
  false3: { type: String, required: true }
});

module.exports = mongoose.model('Exercice', exerciceSchema);
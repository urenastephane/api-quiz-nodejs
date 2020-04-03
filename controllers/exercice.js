// CONTROLLERS FILE for EXERCICES

const jwt = require('jsonwebtoken')
const Exercice = require('../models/exercice')
const User = require('../models/user');


exports.getAllExercices= (req, res, next) => {
    /*var header = req.headers.authorization
    console.log(header)
    if (header !== undefined) {
        console.log(header)
    }
    console.log(req.headers.authorization)
    var Token = jwt.sign({ userId: req.userId }, 'RANDOM_TOKEN_SECRET',{ expiresIn: '24h' })*/
    
  Exercice.find()
    .then((exercices)=> {
      //res.setHeader('Authorization', 'Bearer '+ Token)
      
      res.render('pages/liste_exercices', {exercices: exercices})})
    .catch(error => res.status(400).json({ error }));
}


exports.getAnExercice= (req, res, next) => {
  Exercice.findOne({ _id: req.params.id })
    .then((exercice)=> {res.render('pages/affiche_exercice', {exercice: exercice})})
    .catch(error => res.status(404).json({ error }));
}


exports.createExercice= (req, res, next) => {
  delete req.body._id;
  const exercice = new Exercice({
    ...req.body
  });
    console.log(exercice)
  exercice.save()
    .then(() => req.flash('success', "Votre exercice a bien été créé!"))
    .then(()=>res.redirect('/create_exercice'))
    .catch(function() {
      req.flash('error', "vous n\'avez pas rempli tous les champs: veuillez-recommencer svp!");
      res.redirect('/create_exercice');
  })
}


exports.deleteExercice= (req, res, next) => {
  Exercice.deleteOne({ _id: req.params.id })
    .then(req.flash('success', "Votre exercice a bien été supprimé: si c'est trop tard, recréez le au lieu de pleurnicher! ;) "))
    .then(res.redirect('/liste'))
    .catch(error => res.status(400).json({ error }));
}


exports.updateExercice= (req, res, next) => {
  Exercice.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(()=>req.flash('success', "Votre exercice a bien été modifié: vous êtes au top! ;) "))
    .then(()=>res.redirect('/liste'))
    .catch(function() {
      req.flash('error', "vous n\'avez pas rempli tous les champs: veuillez-recommencer svp!");
      res.redirect('/create_exercice');
  });
}
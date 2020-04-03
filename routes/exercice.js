// ROUTES FILE for EXERCICES

const express = require('express');
//const connection = require('../config/db')
const router = express.Router();
const Exercice = require('../models/exercice')
const exerciceCtrl = require('../controllers/exercice')
const auth = require('../middlewares/auth');
var jwt = require('express-jwt');

var secret = 'secret'


// ------------ PROTECTED ROUTES FOR TEACHERS --------------------
// FORM to CREATE EXERCISE: route destinée à renvoyer la page principale de CREATION d'EXERCICE index.ejs
router.get('/create_exercice', (req, res) => {
    res.render('pages/create_exercice', {test: 'brave'})
})

// CREATE EXERCICE
router.post('/create_exercice', exerciceCtrl.createExercice);

// READ LIST OF EXERCICES
//router.get('/liste', exerciceCtrl.getAllExercices);
router.get('/liste', exerciceCtrl.getAllExercices);



// GET ONE EXERCICE
router.get('/liste/:id', exerciceCtrl.getAnExercice);

// GO TO UPDATE FORM
router.get('/go-to-update/:id', auth, (req, res, next) => {
    Exercice.findOne({ _id: req.params.id })
    .then((exercice) => {res.render('pages/update', {exercice: exercice})
    })
    .catch(error => res.status(404).json({ error }));

})

// UPDATE EXERCICE
router.post('/update/:id', exerciceCtrl.updateExercice);

// DELETE
router.get('/suppression/:id', exerciceCtrl.deleteExercice);





// ------------ PROTECTED ROUTES FOR STUDENTS -----------------

// READ LIST OF EXERCICES
router.get('/listeExStudent', exerciceCtrl.getAllExercices);

// TAKE ONE EXERCICE
router.get('/listeExStudent/:id', exerciceCtrl.getAnExercice);



module.exports = router
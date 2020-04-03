const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
var Cookies = require('cookies')

//const bearerToken = require('express-bearer-token');



exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        pseudo: req.body.pseudo,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => req.flash('success', "Votre compte a bien été créé! Veuillez vous reconnecter dès maintenant pour pouvoir bénéficier de tous les services!"))
        .then(()=>res.redirect('/login'))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

// render and json => JWT
// see: https://stackoverflow.com/questions/54588034/nodejs-express-send-res-render-and-res-json-simultaneously
// VOIR COMMENT OBTENIR BEARER 

//const fakeUser = { email: 'testuser@testmail.fr', password: 'qsd' };
var secret = 'batslescouillesdu18@niqueSaRaceLaChauveDeMonZboub'

const expressJwt = require('express-jwt')


exports.loginProtected = (req, res) => {
    console.log('login post', req.body);
    var utilisateur = User.findOne({ email: req.body.email })
    //console.log(utilisateur)
    if (!req.body || !utilisateur) {
        return res.sendStatus(500);
    } else {
        const matchPwd = bcrypt.compare(req.body.password, utilisateur.password);
        if(matchPwd) {
            const myToken = jwt.sign( { userId: utilisateur._id , role: 'prof'},
              secret,
              { expiresIn: '24h' })
            res.json(myToken);
        } else {
            res.sendStatus(401);
        } 
    } 
};


/*
exports.loginProtected = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          
          var Token = jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          console.log("le token cree dans login côté BACK")
          console.log(Token)
          //XMLHttpRequest.setRequestHeader('Authorization', 'Bearer '+ Token);
          //res.setHeader('Authorization', 'Bearer '+ Token);
          //res.json({userId: user._id,token: Token})
            res.json(Token)
        })
        .catch(error => res.status(500).json({ error }))
    })
    .catch(error => res.status(500).json({ error }));
};*/

/*
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' })})})*/




/*
app.use(function (req, res, next) {
    res.renderWithData = function (view, model, data) {
        res.render(view, model, function (err, viewString) {
            data.view = viewString;
            res.json(data);
        }); 
    };
    next();
});

*/

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          //res.status(200).json({userId: user._id,token: Token})
            res.render('pages/index')
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
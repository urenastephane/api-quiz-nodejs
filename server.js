// MAIN SERVER 

const express = require('express')
const session = require('express-session')
const app = express()
const mongoose = require('mongoose');
const Exercice = require('./models/exercice');
const bodyParser = require('body-parser')
const flash= require('./middlewares/flash')
const { body, validationResult } = require('express-validator');
const exerciceRoutes = require('./routes/exercice');
const userRoutes = require('./routes/user');
const expressJwt = require('express-jwt')


// Utilisation de moteurs de modèles avec Express: ici EJS
app.set('view engine', 'ejs');

//MIDDLEWARES
// gestion des fichiers statiques via le dossier public et la route /assets
app.use('/assets', express.static('public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

//CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// connexion à la BDD mongodb via le cluster sur mongoAtlas
mongoose.connect('mongodb+srv://admin:admin@cluster0-fic1w.mongodb.net/test?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));


//  ajouté après : gestion des sessions

app.use(session({
  secret: 'pipidechat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000, secure: false } //false car pas https
}))

app.use(flash)

//var secret = 'batslescouillesdu18@niqueSaRaceLaChauveDeMonZboub'
//app.use(expressJwt({secret: secret, }).unless({path:['/login', '/signup', '/', '/loginProtected']}))


/*
// see:
//https://github.com/auth0/express-jwt#multi-tenancy
app.use(jwt({
  secret: 'hello world !',
  credentialsRequired: false,
  getToken: function fromHeaderOrQuerystring (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
}).unless({path:['/login', '/signup', '/', '/loginProtected']}));
*/


// ########## ROUTES ###########
// EXERCICE MANAGEMENT
app.use('', exerciceRoutes);
// AUTHENTICATION
app.use('', userRoutes);

// Go to main pages of the web site without controllers
// 1) Go to  HOME page:
app.get('/', (req, res) => {
    res.render('pages/index', {test: 'brave'})
})

// 2) GO to LOGIN page:
app.get('/login', (req, res) => {
    res.render('pages/login', {test: 'brave'})
})

// 3) Go to SIGN UP page:
app.get('/signup', (req, res) => {
    res.render('pages/signup', {test: 'brave'})
})


app.get('/member-only', (req,res) => {
    console.log('req.user', req.user)
    res.send(req.user)
})



// ############# 4) EXERCICE ROUTES #############
/*
const exerciceRoutes = require('./routes/exercice')
app.use('', exerciceRoutes)
*/
// main route to EXERCICES



// AUTHENTICATION
//app.post('/signup', user.signup)
//app.post('/login', user.login)


// listen on port 8080
app.listen(8080)

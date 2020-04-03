const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/loginProtected', userCtrl.loginProtected);

const expressJwt = require('express-jwt')


module.exports = router;
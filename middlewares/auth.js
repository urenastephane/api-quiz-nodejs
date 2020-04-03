
const jwt = require('jsonwebtoken');

var secret = 'batslescouillesdu18@niqueSaRaceLaChauveDeMonZboub'


module.exports = (req, res, next) => {
    console.log("---- in verify jwt middleware ----")
    //console.log(req.headers)
    console.log(req.headers)
  try {
    const token = req.headers.authorization.split(' ')[1];
    console.log("---- in try ----")
    console.log(token)
    const decodedToken = jwt.verify(token, secret);
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
        console.log("JWT match")
        next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
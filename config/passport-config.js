const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initializePassport(passport) {
    const authenticateUser = (mail, password, done) => {
        const user = getUserByEmail(mail)
        if (user === null) {
            return done(null, false, {message : 'No user with that email'})
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: 'password incorrect'})
                }
        } catch (e) {
            return done(e)
        }
    }
    
    passort.use(new LocalStrategy({ usernameField: 'mail'}), authenticateUser)
    passport.serializeUser((user,done) => {
        
    })
    passport.deserializeUser((id, done) => {
        
    })
}

module.exports = initializePassport
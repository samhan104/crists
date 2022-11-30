const LocalStrategy = require('passport-local').Strategy
const User = require('./models/users.js')
const bcrypt = require('bcrypt')

function initialize(passport, getUserByEmail, getUserById){
    const authenticateUsers = async (email, password, done) => {
        const user = await User.findOne({email: email})
        if(user == null) {
            return done(null, false, {message: "Your email and password doesn't match"})
        }
        
        try {
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message: "Your email and password doesn't match"})
            }
        } catch (e) {
            return done(e)
        }
    }
    passport.use(new LocalStrategy({usernameField: 'email'}, authenticateUsers))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))})
}

module.exports = initialize
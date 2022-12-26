const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const User = require('../models/user')

module.exports = (passport) => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            function verify(email, password, cb) {
                User.findOne({ email: email }, (err, user) => {
                    if (err) {
                        return cb(err)
                    }
                    if (!user) {
                        return cb(null, false, { message: 'Email yoki parol xato' })
                    }
                    bcrypt.compare(password, user.password, (err, isMatch) => {
                        if (err) {
                            return cb(err)
                        }
                        if (isMatch) {
                            return cb(null, user)
                        } else {
                            return cb(null, false, { message: 'Email yoki parol xato' })
                        }
                    })
                })
            }
        )
    )
    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    })
    passport.deserializeUser((id, cb) => {
        User.findById(id, (err, user) => {
            cb(err, user)
        })
    })
}
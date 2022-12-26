const bcrypt = require('bcryptjs')
const { Router } = require('express')
const passport = require('passport')
const { validationResult } = require('express-validator')
const { registerValidators } = require('../utils/validators')
const User = require('../models/user')
const router = Router()

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Kirish sahifasi',
        isLogin: true,
        registerError: req.flash('registerError')
    })
})

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/auth/login#login',
        failureFlash: { type: 'failureMessages', message: 'Kirish bilan bog\'liq muammo yuz berdi' }
    }),
    (req, res) => {
        res.redirect('/auth/login#login')
    })

router.get('/logout', async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            throw err
        }
        res.redirect('/auth/login#login')
    })
})

router.post('/register', registerValidators, async (req, res) => {
    try {
        const { name, email, password, confirm } = req.body
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            req.flash('registerError', errors.array()[0].msg)
            return res.status(422).redirect('/auth/login#register')
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new User({
            name, email, password: hashPassword
        })
        user.save()
        res.redirect('/auth/login#login')
    } catch (err) {
        console.log(err)
    }
})

module.exports = router
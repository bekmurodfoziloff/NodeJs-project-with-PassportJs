module.exports = function(req, res, next) {
    if (!req.isAuthenticated()) {
        res.redirect('/auth/login')
    }
    next()
}
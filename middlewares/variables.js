module.exports = function(req, res, next) {
  res.locals.isAuth = req.isAuthenticated()
  res.locals.csrf = req.csrfToken()
  res.locals.failureMessages = req.flash('failureMessages')
  next()
}
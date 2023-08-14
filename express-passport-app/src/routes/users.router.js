const express = require('express');
const usersRouter = express.Router();
const { checkNotAuthenticated, checkAuthenticated } = require('../middleware/auth');
const User = require('../models/user.model');
const passport = require('passport');

usersRouter.post('/login', (req, res, next) => {
  console.log('1')
  console.log(req.body)
  passport.authenticate('local', (err, user, info) => {
    console.log('2')
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.json({ msg: info });
    }

    req.login(user, function (err) {
      if (err) { return next(err); }
      console.log(user)
      res.redirect('/')
    })
  })(req, res, next)
})

usersRouter.post('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) { return next(err) }
    res.redirect('/login')
  } )
})

usersRouter.post('/signup', async (req, res, next) => {
  // user 객체를 생성
  const user = new User(req.body)
  try {
    // user 컬렉션에 유저를 저장
    await user.save();
    return res.status(200).json({ success: true})
  }
  catch (err) {
    console.error(err)
  }
})

usersRouter.get('/google', passport.authenticate('google'))
usersRouter.get('/google/callback', passport.authenticate('google', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
}))

module.exports = usersRouter;
const passport = require('passport')
const User = require('../models/user.model')
const LocalStrategy = require('passport-local').Strategy

// req.login(user)

passport.serializeUser((user, done) => {
  done(null, user.id);
})

// client => session => request

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
    done(null, user)
  })
})


passport.use('local', new LocalStrategy({ usernameField: 'email', passwordField: 'password' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email: email.toLowerCase() });

      if (!user) {
        return done(null, false, { msg: `Email ${email} not found` });
      }

      await user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err)
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { msg: 'Invalid email or password.' });
        }
      });

    } catch (err) {
      return done(err);
    }
  })
);
const passport = require('passport')
const User = require('../models/user.model')
const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy

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


const googleStrategyConfig = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: '/auth/google/callback',
  scope: ['email', 'profile']
}, (accessToken, refreshToken, profile, done) => {
  User.findOne({ googleId: profile.id })
    .then((existingUser) => {
      if (existingUser) {
        return done(null, existingUser);
      } else {
        const user = new User();
        user.email = profile.emails[0].value;
        user.googleId = profile.id;
        return user.save();
      }
    })
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      console.error(err);
      done(err);
    })
})

passport.use('google', googleStrategyConfig)
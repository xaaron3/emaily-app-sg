const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

// model class
const User = mongoose.model('users');

// put identifying info into cookie
passport.serializeUser((user, done) => {
   done(null, user.id); // null is error object if exists
});

// cookie pull back out, use in future
passport.deserializeUser((id, done) => {
   User.findById(id).then((user) => {
      done(null, user);
   });
});

passport.use(
   new GoogleStrategy(
      {
         clientID: keys.googleClientID,
         clientSecret: keys.googleClientSecret,
         callbackURL: '/auth/google/callback',
         proxy: true
      },
      async (accessToken, refreshToken, profile, done) => {
         const existingUser = await User.findOne({ googleId: profile.id });

         if (existingUser) {
            return done(null, existingUser);
         }

         const user = await new User({ googleId: profile.id }).save();
         done(null, user);
      }
   )
);

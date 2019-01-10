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
         callbackURL: '/auth/google/callback'
      },
      (accessToken, refreshToken, profile, done) => {
         // fineOne returns a promise
         User.findOne({ googleId: profile.id }).then((existingUser) => {
            if (existingUser) {
               // we have a record w/ given prof id
               // null below is in (error) place
               done(null, existingUser);
            } else {
               // dont have record
               new User({ googleId: profile.id }) // creates new model instance
                  .save() //.save() finally pushes to db
                  .then((user) => done(null, user));
            }
         });
      }
   )
);

const passport = require('passport');

module.exports = (app) => {
   app.get(
      '/auth/google',
      passport.authenticate('google', {
         scope: ['profile', 'email']
      })
   );

   // login/authenticate and redirect
   app.get(
      '/auth/google/callback',
      passport.authenticate('google'),
      (req, res) => {
         res.redirect('/surveys');
      }
   );

   // when directed to logout, logs out, redirected to log in
   app.get('/api/logout', (req, res) => {
      req.logout();
      res.redirect('/');
   });

   app.get('/api/current_user', (req, res) => {
      res.send(req.user);
   });
};

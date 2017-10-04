const passport = require('passport');

module.exports = app => {
  // GET /auth/google
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  The first step in Google authentication will involve redirecting
  //   the user to google.com.  After authorization, Google will redirect the user
  //   back to this application at /auth/google/callback
  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
      prompt: 'select_account'
    })
  );

  // GET logout a user and redirect to application root
  app.get('/api/logout', (req, res) => {
    req.logout(); // logout is attached to the request object by passport
    res.redirect('/');
  });

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
      res.redirect('/surveys');
    }
  );

  // GET current logged in user
  app.get('/api/current_user', (req, res) => {
    res.send(req.user); // Passport attached the user property to the request object
  });
};

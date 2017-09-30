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
      scope: ['profile', 'email']
    })
  );

  app.get('/api/logout', (req, res) => {
    req.logout(); // Attached to the request object by passport
    res.send(req.user);
  });

  // GET /auth/google/callback
  //   Use passport.authenticate() as route middleware to authenticate the
  //   request.  If authentication fails, the user will be redirected back to the
  //   login page.  Otherwise, the primary route function function will be called,
  //   which, in this example, will redirect the user to the home page.
  app.get('/auth/google/callback', passport.authenticate('google'));

  // GET
  app.get('/api/current_user', (req, res) => {
    res.send(req.user); // Passport attached the user property to the request object
  });
};

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Passport Docs: OAuthStrategy
const keys = require('../../config/keys');

// Use the GoogleStrategy within Passport.
//  Strategies in passport require a `verify` function, which accept
//  credentials (in this case, a token, tokenSecret, and Google profile), and
//  invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback'
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('access token', accessToken);
      console.log('refresh token', refreshToken);
      console.log('profile', profile);
    }
  )
);

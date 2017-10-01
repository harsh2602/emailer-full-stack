const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy; // Passport Docs: OAuthStrategy
const mongoose = require('mongoose');
const keys = require('../../config/keys');
// Fetch the users model
const User = mongoose.model('users');

/**
* @function serializeUser generate an identifying piece of information. That information will be stuffed as a cookie to the header.
* @param user the user object is a single instance from the users collection
* @param done signifies to passport middleware that process is done with id of user returned
*/
passport.serializeUser((user, done) => {
  done(null, user.id);
});

/**
* @function deSerializeUser take the id from cookie and turn it back into actual user model
* @param id is the user id that was generated when user model was serialized
*/
passport.deserializeUser((id, done) => {
  /**
  * @function findById find a record using the id(similar to primary key)
  */
  User.findById(id).then(user => {
    done(null, user);
  });
});

// Use the GoogleStrategy within Passport.
//  Strategies in passport require a `verify` function, which accept
//  credentials (in this case, a token, tokenSecret, and Google profile), and
//  invoke a callback with a user object.
passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: '/auth/google/callback',
      proxy: true
    },
    // Create a new user in MongoDB
    async (accessToken, refreshToken, profile, done) => {
      /**
      * @function findOne: Find one record based on a condition
      * @return Promise
      * @param existingUser: is an object i.e. either a MongooseModel Instance or a null object
      */
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        // User already exists with the ID
        return done(null, existingUser); // Communicate to passport that process it finished
      }
      // Create new user with new ID
      const user = await new User({ googleId: profile.id }).save(); // Represents a model instance
      done(null, user); // Represents another model instance although a similar one to the previous
    }
  )
);

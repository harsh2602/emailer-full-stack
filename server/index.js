const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session'); // Manages cookies for the session
const passport = require('passport'); // Passport here needs to keep track of user authentication state by using cookies
const bodyParser = require('body-parser');
const keys = require('../config/keys');

/**
* Order important for the two require statement to avoid:
* MissingSchemaError: Schema hasn't been registered for model
*/
require('./models/User');
require('./services/passport');

// Connect to MongoDB
mongoose.connect(keys.mongoURI);

// Create an instance of the application
const app = express();

// Parser middleware: Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
app.use(bodyParser.json());

// Express needs to make use of cookies for the application
app.use(
  // Cookie Session will take the passed object and assign it to req.session property
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey] //key is used to encrypt a cookie. Multiple allowed and one will be picked randomly.
  })
);

// Passport makes use of cookies to handle authentication
app.use(passport.initialize());
app.use(passport.session());

// IIFE's defined below
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

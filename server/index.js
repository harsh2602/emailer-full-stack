const express = require('express');
const mongoose = require('mongoose');
const keys = require('../config/keys');
require('./services/passport');

// Connect to MongoDB
mongoose.connect(keys.mongoURI);

// Create an instance of the application
const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

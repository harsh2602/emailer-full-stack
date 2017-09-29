const express = require('express');
require('./services/passport');

// Create an instance of the application
const app = express();

require('./routes/authRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

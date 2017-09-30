// keys.js: Figure out what credentials to return
if (process.env.NODE_ENV === 'production') {
  // return the production keys
  module.exports = require('./prod');
} else {
  // return the dev keys
  module.exports = require('./dev');
}

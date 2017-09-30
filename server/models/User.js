const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String
});

/**
* Set the schema to the collection
* @param collection: mongoose will not overwrite in case schema already exist
* @param schema
*/
mongoose.model('users', userSchema);

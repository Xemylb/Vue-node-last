/**
 * Created by User on 16.03.2017.
 */
// app/models/user.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our user model
var postSchema = mongoose.Schema({
            title: String,
            image: String,
            description: String,
            short_description: String,
            date: String
});

// methods ======================
// generating a hash


// create the model for users and expose it to our app
module.exports = mongoose.model('Post', postSchema);
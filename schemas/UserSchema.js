var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    permission: [],
    savedListIDs: []
});

var User = mongoose.model('User', userSchema, 'users');

module.exports = {
    User: User
}
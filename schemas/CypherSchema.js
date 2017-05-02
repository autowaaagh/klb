var mongoose = require('mongoose');

var cypherSchema = new mongoose.Schema({
    id: String,
    name: String,
    desc: String,
    level: String,
    source: String,
    isBooster: Boolean
});

var Cypher = mongoose.model('Cypher', cypherSchema, 'cyphers');

module.exports = {
    Cypher: Cypher
};
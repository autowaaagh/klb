var mongoose = require('mongoose');

var artefactSchema = new mongoose.Schema({
    name: String,
    pts: Number,
    validTypes: [],
    description: String
});

var Artefact = mongoose.model('Artefact', artefactSchema, 'artefacts');

module.exports = {
    Artefact: Artefact
};
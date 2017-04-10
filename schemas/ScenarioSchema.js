var mongoose = require('mongoose');

var scenarioSchema = new mongoose.Schema({
    name: String,
    diceResult: Number,
    description: String
});

var Scenario = mongoose.model('Scenario', scenarioSchema, 'scenarios');

module.exports = {
    Scenario: Scenario
};
var mongoose = require('mongoose');

var specialRuleSchema = new mongoose.Schema({
    name: String,
    desc: String
});

var SpecialRule = mongoose.model('SpecialRule', specialRuleSchema, 'specialrules');

module.exports = {
    SpecialRule: SpecialRule
}
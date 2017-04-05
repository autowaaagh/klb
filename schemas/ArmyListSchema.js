var mongoose = require('mongoose');

var armyListSchema = new mongoose.Schema({
    name: String,
    points: Number,
    units: [{
        name: String,
        unitType: String,
        unitOptions: [{
            unitSize: String,
            modelCount: Number,
            sp: String,
            me: String,
            ra: String,
            de: String,
            at: String,
            nv: {
                waver: String,
                route: String
            },
            pts: Number
        }],
        special: [String],
        piercing: Number,
        cs: Number,
        tc: Number,
        unitUpgrades: [{
            name: String,
            pts: Number,
            isSelected: Boolean,
            unitModifiers: [{
                element: String,
                newValue: String,
                action: String
            }],
            unitOptionModifiers: [{
                element: String,
                newValue: String,
                action: String
            }]
        }],
        artefact: String,
        isExpanded: Boolean
    }]
});

var ArmyList = mongoose.model('ArmyList', armyListSchema, 'armylists');

module.exports = {
    ArmyList: ArmyList
}
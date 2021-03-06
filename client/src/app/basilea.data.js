"use strict";
var BasileaData = (function () {
    function BasileaData() {
        this.armyList = {
            name: "Basilea",
            points: 0,
            units: [
                {
                    name: 'Crossbowmen',
                    type: 'Infantry',
                    unitOptions: [
                        { unitSize: 'Troop', modelCount: 10, sp: '5', me: '5', ra: '5', de: '4', at: '8', nv: { waver: '10', route: '12' }, pts: 100 },
                        { unitSize: 'Regiment', modelCount: 20, sp: '5', me: '5', ra: '5', de: '4', at: '10', nv: { waver: '14', route: '16' }, pts: 130 },
                        { unitSize: 'Horde', modelCount: 40, sp: '5', me: '5', ra: '5', de: '4', at: '20', nv: { waver: '21', route: '23' }, pts: 215 }
                    ],
                    special: ['Crossbows (Range 24")', 'Iron Resolve', 'Reload!'],
                    piercing: 1,
                    cs: 0,
                    tc: 0,
                    unitUpgrades: null,
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Men-At-Arms (Spear)',
                    type: 'Infantry',
                    unitOptions: [
                        { unitSize: 'Troop', modelCount: 10, sp: '5', me: '4', ra: '-', de: '4', at: '10', nv: { waver: '10', route: '12' }, pts: 95 },
                        { unitSize: 'Regiment', modelCount: 20, sp: '5', me: '4', ra: '-', de: '4', at: '15', nv: { waver: '14', route: '16' }, pts: 135 },
                        { unitSize: 'Horde', modelCount: 40, sp: '5', me: '4', ra: '-', de: '4', at: '30', nv: { waver: '21', route: '23' }, pts: 225 }
                    ],
                    special: ['Iron Resolve', 'Phalanx'],
                    piercing: 0,
                    cs: 0,
                    tc: 0,
                    unitUpgrades: null,
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Men-At-Arms (Sword)',
                    type: 'Infantry',
                    unitOptions: [
                        { unitSize: 'Troop', modelCount: 10, sp: '5', me: '4', ra: '-', de: '4', at: '10', nv: { waver: '10', route: '12' }, pts: 80 },
                        { unitSize: 'Regiment', modelCount: 20, sp: '5', me: '4', ra: '-', de: '4', at: '12', nv: { waver: '14', route: '16' }, pts: 115 },
                        { unitSize: 'Horde', modelCount: 40, sp: '5', me: '4', ra: '-', de: '4', at: '25', nv: { waver: '21', route: '23' }, pts: 190 }
                    ],
                    special: ['Iron Resolve'],
                    piercing: 0,
                    cs: 0,
                    tc: 0,
                    unitUpgrades: null,
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Paladin Foot Guard',
                    type: 'Cavalry',
                    unitOptions: [
                        { unitSize: 'Troop', modelCount: 10, sp: '5', me: '3', ra: '-', de: '5', at: '10', nv: { waver: '11', route: '13' }, pts: 105 },
                        { unitSize: 'Regiment', modelCount: 20, sp: '5', me: '3', ra: '-', de: '5', at: '12', nv: { waver: '15', route: '17' }, pts: 150 },
                    ],
                    special: ['Headstrong', 'Iron Resolve'],
                    piercing: 0,
                    cs: 0,
                    tc: 0,
                    unitUpgrades: [{
                            name: 'Exchange shields for two-handed weapons (lower De to 4+, gain Crushing Strength (1))', pts: 0, isSelected: false,
                            unitModifiers: [{ element: 'cs', newValue: 1, action: 'add' }], unitOptionModifiers: [{ element: 'de', newValue: '4', action: 'replace' }]
                        }],
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Penitents Mob',
                    type: 'Infantry',
                    unitOptions: [
                        { unitSize: 'Troop', modelCount: 10, sp: '5', me: '5', ra: '-', de: '3', at: '10', nv: { waver: '8', route: '10' }, pts: 70 },
                        { unitSize: 'Regiment', modelCount: 20, sp: '5', me: '5', ra: '-', de: '3', at: '15', nv: { waver: '12', route: '14' }, pts: 100 },
                        { unitSize: 'Horde', modelCount: 40, sp: '5', me: '5', ra: '-', de: '3', at: '30', nv: { waver: '19', route: '21' }, pts: 165 }
                    ],
                    special: ['Iron Resolve', 'Headstrong'],
                    piercing: 0,
                    cs: 1,
                    tc: 0,
                    unitUpgrades: null,
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Sisterhood Infantry',
                    type: 'Infantry',
                    unitOptions: [
                        { unitSize: 'Troop', modelCount: 10, sp: '5', me: '4', ra: '-', de: '3', at: '10', nv: { waver: '10', route: '12' }, pts: 90 },
                        { unitSize: 'Regiment', modelCount: 20, sp: '5', me: '4', ra: '-', de: '3', at: '15', nv: { waver: '14', route: '16' }, pts: 130 },
                        { unitSize: 'Horde', modelCount: 40, sp: '5', me: '4', ra: '-', de: '3', at: '30', nv: { waver: '21', route: '23' }, pts: 215 }
                    ],
                    special: ['Iron Resolve', 'Headstrong', 'Vicious'],
                    piercing: 0,
                    cs: 1,
                    tc: 0,
                    unitUpgrades: null,
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Elohi',
                    type: 'Large Infantry',
                    unitOptions: [
                        { unitSize: 'Regiment', modelCount: 3, sp: '10', me: '3', ra: '-', de: '5', at: '9', nv: { waver: '-', route: '14' }, pts: 195 },
                        { unitSize: 'Horde', modelCount: 6, sp: '10', me: '3', ra: '-', de: '5', at: '18', nv: { waver: '-', route: '17' }, pts: 300 }
                    ],
                    special: ['Fly', 'Inspiring', 'Iron Resolve'],
                    piercing: 0,
                    cs: 1,
                    tc: 1,
                    unitUpgrades: null,
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Paladin Knights',
                    type: 'Cavalry',
                    unitOptions: [
                        { unitSize: 'Troop', modelCount: 5, sp: '8', me: '3', ra: '-', de: '5', at: '8', nv: { waver: '12', route: '14' }, pts: 135 },
                        { unitSize: 'Regiment', modelCount: 10, sp: '8', me: '3', ra: '-', de: '5', at: '16', nv: { waver: '15', route: '17' }, pts: 210 },
                        { unitSize: 'Horde', modelCount: 20, sp: '8', me: '3', ra: '-', de: '5', at: '32', nv: { waver: '22', route: '24' }, pts: 350 }
                    ],
                    special: ['Headstrong', 'Iron Resolve'],
                    piercing: 0,
                    cs: 0,
                    tc: 2,
                    unitUpgrades: null,
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Sisterhood Panther Lancers',
                    type: 'Cavalry',
                    unitOptions: [
                        { unitSize: 'Troop', modelCount: 5, sp: '10', me: '4', ra: '-', de: '3', at: '8', nv: { waver: '11', route: '13' }, pts: 115 },
                        { unitSize: 'Regiment', modelCount: 10, sp: '10', me: '4', ra: '-', de: '3', at: '16', nv: { waver: '14', route: '16' }, pts: 175 }
                    ],
                    special: ['Iron Resolve', 'Nimble', 'Vicious'],
                    piercing: 0,
                    cs: 0,
                    tc: 1,
                    unitUpgrades: null,
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Sisterhood Panther Chariot',
                    type: 'Large Cavalry',
                    unitOptions: [
                        { unitSize: 'Regiment', modelCount: 3, sp: '9', me: '4', ra: '-', de: '4', at: '15', nv: { waver: '12', route: '14' }, pts: 180 },
                        { unitSize: 'Horde', modelCount: 6, sp: '9', me: '4', ra: '-', de: '4', at: '30', nv: { waver: '15', route: '17' }, pts: 280 }
                    ],
                    special: ['Base Size (50x100mm)', 'Iron Resolve', 'Vicious'],
                    piercing: 0,
                    cs: 0,
                    tc: 2,
                    unitUpgrades: null,
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Heavy Arbalest',
                    type: 'War Engine',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '5', me: '-', ra: '5', de: '4', at: '1', nv: { waver: '10', route: '12' }, pts: 65 },
                    ],
                    special: ['Iron Resolve', 'Blast (D3+2)', 'Reload!'],
                    piercing: 2,
                    cs: 0,
                    tc: 0,
                    unitUpgrades: null,
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Abbess on Panther Chariot',
                    type: 'Hero (Large Cavalry)',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '9', me: '3', ra: '-', de: '5', at: '8', nv: { waver: '14', route: '16' }, pts: 170 },
                    ],
                    special: ['Iron Resolve', 'Base Size (50x100mm)', 'Headstrong', 'Very Inspiring (Sisterhood only)', 'Vicious'],
                    piercing: 0,
                    cs: 1,
                    tc: 1,
                    unitUpgrades: null,
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Bearer of the Holy Icon',
                    type: 'Hero (Infantry)',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '5', me: '5', ra: '-', de: '4', at: '1', nv: { waver: '10', route: '12' }, pts: 55 },
                    ],
                    special: ['Iron Resolve', 'Individual', 'Inspiring'],
                    piercing: 0,
                    cs: 0,
                    tc: 0,
                    unitUpgrades: [{
                            name: 'Mount on a barded horse, increasing Sp to 8 and De to 5+ and changing to Hero (Cavalry)', pts: 20, isSelected: false,
                            unitModifiers: [{ element: 'type', newValue: 'Hero (Cavalry)', action: 'replace' }],
                            unitOptionModifiers: [{ element: 'de', newValue: '5', action: 'replace' }, { element: 'sp', newValue: '8', action: 'replace' }]
                        }],
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Dictator',
                    type: 'Hero (Infantry)',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '5', me: '3', ra: '-', de: '5', at: '3', nv: { waver: '13', route: '15' }, pts: 90 },
                    ],
                    special: ['Iron Resolve', 'Individual', 'Inspiring'],
                    piercing: 0,
                    cs: 1,
                    tc: 0,
                    unitUpgrades: [{
                            name: 'Mount on a Basilean warhorse, increasing Sp to 8 and gaining Thunderous Charge (1) and changing to Hero (Cavalry)', pts: 30, isSelected: false,
                            unitModifiers: [{ element: 'type', newValue: 'Hero (Cavalry)', action: 'replace' }, { element: 'tc', newValue: 1, action: 'add' }],
                            unitOptionModifiers: [{ element: 'sp', newValue: '8', action: 'replace' }]
                        }],
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Gnaeus Sallustis [1]',
                    type: 'Hero (Large Cavalry)',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '9', me: '3', ra: '-', de: '5', at: '7', nv: { waver: '15', route: '17' }, pts: 190 },
                    ],
                    special: ['Iron Resolve', 'Individual', 'Inspiring', 'Headstrong', 'Heal (3)', 'Nimble'],
                    piercing: 0,
                    cs: 2,
                    tc: 0,
                    unitUpgrades: [],
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'High Paladin on Dragon',
                    type: 'Hero (Monster)',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '10', me: '3', ra: '-', de: '5', at: '9', nv: { waver: '17', route: '19' }, pts: 310 },
                    ],
                    special: ['Base Size (50x50mm)', 'Breath Attack (10)', 'Fly', 'Iron Resolve', 'Inspiring', 'Headstrong', 'Heal (2)'],
                    piercing: 0,
                    cs: 3,
                    tc: 0,
                    unitUpgrades: [{ name: 'Weakness', pts: 20, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Weakness', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Bloodboil', pts: 25, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Bloodboil', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Soul Drain', pts: 30, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Soul Drain', action: 'add-array' }], unitOptionModifiers: [] }],
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'High Paladin on Griffin',
                    type: 'Hero (Monster)',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '10', me: '3', ra: '-', de: '5', at: '7', nv: { waver: '15', route: '17' }, pts: 210 },
                    ],
                    special: ['Base Size (50x50mm)', 'Fly', 'Iron Resolve', 'Inspiring', 'Headstrong', 'Heal (2)'],
                    piercing: 0,
                    cs: 2,
                    tc: 0,
                    unitUpgrades: [{ name: 'Weakness', pts: 20, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Weakness', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Bloodboil', pts: 25, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Bloodboil', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Soul Drain', pts: 30, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Soul Drain', action: 'add-array' }], unitOptionModifiers: [] }],
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'High Paladin',
                    type: 'Hero (Infantry)',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '5', me: '3', ra: '-', de: '5', at: '5', nv: { waver: '13', route: '15' }, pts: 130 },
                    ],
                    special: ['Iron Resolve', 'Individual', 'Inspiring', 'Headstrong', 'Heal (2)'],
                    piercing: 0,
                    cs: 1,
                    tc: 0,
                    unitUpgrades: [{
                            name: 'Mount on a Basilean warhorse, increasing Sp to 8 and gaining Thunderous Charge (1) and changing to Hero (Cavalry)', pts: 30, isSelected: false,
                            unitModifiers: [{ element: 'type', newValue: 'Hero (Cavalry)', action: 'replace' }, { element: 'tc', newValue: 1, action: 'add' }],
                            unitOptionModifiers: [{ element: 'sp', newValue: '8', action: 'replace' }]
                        },
                        { name: 'Weakness', pts: 20, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Weakness', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Bloodboil', pts: 25, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Bloodboil', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Soul Drain', pts: 30, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Soul Drain', action: 'add-array' }], unitOptionModifiers: [] }],
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Priest',
                    type: 'Hero (Infantry)',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '5', me: '4', ra: '-', de: '4', at: '1', nv: { waver: '11', route: '13' }, pts: 75 },
                    ],
                    special: ['Iron Resolve', 'Individual', 'Very Inspiring (Penitents only)', 'Headstrong', 'Heal (3)'],
                    piercing: 0,
                    cs: 1,
                    tc: 0,
                    unitUpgrades: [{
                            name: 'Mount on a horse, increasing Sp to 9 and changing to Hero (Cavalry)', pts: 15, isSelected: false,
                            unitModifiers: [{ element: 'type', newValue: 'Hero (Cavalry)', action: 'replace' }], unitOptionModifiers: [{ element: 'sp', newValue: '9', action: 'replace' }]
                        },
                        { name: 'Bane-chant (2)', pts: 15, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Bane-chant', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Weakness', pts: 20, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Weakness', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Bloodboil', pts: 25, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Bloodboil', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Soul Drain', pts: 30, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Soul Drain', action: 'add-array' }], unitOptionModifiers: [] }],
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'War-Wizard',
                    type: 'Hero (Infantry)',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '5', me: '4', ra: '-', de: '4', at: '1', nv: { waver: '11', route: '13' }, pts: 60 },
                    ],
                    special: ['Iron Resolve', 'Individual', 'Fireball (8)'],
                    piercing: 0,
                    cs: 0,
                    tc: 0,
                    unitUpgrades: [{
                            name: 'Mount on a horse, increasing Sp to 9 and changing to Hero (Cavalry)', pts: 15, isSelected: false,
                            unitModifiers: [{ element: 'type', newValue: 'Hero (Cavalry)', action: 'replace' }], unitOptionModifiers: [{ element: 'sp', newValue: '9', action: 'replace' }]
                        },
                        { name: 'Lightning Bolt (3)', pts: 25, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Lightning Bolt (3)', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Wind Blast (5)', pts: 30, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Wind Blast (5)', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Weakness', pts: 20, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Weakness', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Bloodboil', pts: 25, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Bloodboil', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Soul Drain', pts: 30, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Soul Drain', action: 'add-array' }], unitOptionModifiers: [] }],
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Julius, Dragon of Heaven [1]',
                    type: 'Hero (Large Infantry)',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '10', me: '3', ra: '-', de: '6', at: '8', nv: { waver: '-', route: '16' }, pts: 275 },
                    ],
                    special: ['Fly', 'Heal (3)', 'Iron Resolve', 'Very Inspiring', 'Twin Souls'],
                    piercing: 0,
                    cs: 2,
                    tc: 1,
                    unitUpgrades: [],
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Samacris, Mother of Phoenixes [1]',
                    type: 'Hero (Large Infantry)',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '10', me: '3', ra: '-', de: '5', at: '3', nv: { waver: '-', route: '15' }, pts: 230 },
                    ],
                    special: ['Fireball (10)', 'Fly', 'Heal (7)', 'Iron Resolve', 'Inspiring', 'Twin Souls', 'Lightning Bolt (5)', 'Regeneration (5+)'],
                    piercing: 0,
                    cs: 1,
                    tc: 0,
                    unitUpgrades: [],
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Ur-Elohi',
                    type: 'Hero (Large Infantry)',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '10', me: '3', ra: '-', de: '5', at: '6', nv: { waver: '-', route: '15' }, pts: 180 },
                    ],
                    special: ['Fly', 'Heal (3)', 'Iron Resolve', 'Inspiring'],
                    piercing: 0,
                    cs: 2,
                    tc: 1,
                    unitUpgrades: [{ name: 'Weakness', pts: 20, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Weakness', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Bloodboil', pts: 25, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Bloodboil', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Soul Drain', pts: 30, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Soul Drain', action: 'add-array' }], unitOptionModifiers: [] }],
                    artefact: null,
                    isExpanded: false
                }, {
                    name: 'Phoenix',
                    type: 'Monster',
                    unitOptions: [
                        { unitSize: 'Single', modelCount: 1, sp: '10', me: '3', ra: '-', de: '3', at: '3', nv: { waver: '14', route: '16' }, pts: 165 },
                    ],
                    special: ['Breath Attack (10)', 'Fly', 'Heal (6)', 'Iron Resolve', 'Inspiring', 'Regeneration (4+)'],
                    piercing: 0,
                    cs: 1,
                    tc: 0,
                    unitUpgrades: [{ name: 'Weakness', pts: 20, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Weakness', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Bloodboil', pts: 25, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Bloodboil', action: 'add-array' }], unitOptionModifiers: [] },
                        { name: 'Soul Drain', pts: 30, isSelected: false, unitModifiers: [{ element: 'special', newValue: 'Soul Drain', action: 'add-array' }], unitOptionModifiers: [] }],
                    artefact: null,
                    isExpanded: false
                }
            ]
        };
    }
    return BasileaData;
}());
exports.BasileaData = BasileaData;
//# sourceMappingURL=basilea.data.js.map
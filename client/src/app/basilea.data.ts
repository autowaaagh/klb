import { ArmyList } from './model';

export class BasileaData {
    armyList: ArmyList = {
        name: "Basilea",
        units: [
            {
                name: 'Paladin Knights',
                type: 'Cavalry',
                unitOptions: [
                    {
                        unitSize: 'Troop',
                        modelCount: 5,
                        sp: 8,
                        me: 3,
                        ra: 0,
                        de: 5,
                        at: 8,
                        nv: { waver: 12, route: 14 },
                        pts: 135
                    }, {
                        unitSize: 'Regiment',
                        modelCount: 10,
                        sp: 8,
                        me: 3,
                        ra: 0,
                        de: 5,
                        at: 16,
                        nv: { waver: 15, route: 17 },
                        pts: 210
                    }, {
                        unitSize: 'Horde',
                        modelCount: 20,
                        sp: 8,
                        me: 3,
                        ra: 0,
                        de: 5,
                        at: 32,
                        nv: { waver: 22, route: 24 },
                        pts: 350
                    }
                ],
                special: [
                    'Headstrong',
                    'Iron Resolve',
                    'Thunderous Charge (2)'
                ],
                isExpanded: false
            }, {
                name: 'Elohi',
                type: 'Large Infantry',
                unitOptions: [
                    {
                        unitSize: 'Regiment',
                        modelCount: 3,
                        sp: 10,
                        me: 3,
                        ra: 0,
                        de: 5,
                        at: 9,
                        nv: { waver: 0, route: 14 },
                        pts: 195
                    }, {
                        unitSize: 'Horde',
                        modelCount: 3,
                        sp: 10,
                        me: 3,
                        ra: 0,
                        de: 5,
                        at: 18,
                        nv: { waver: 0, route: 17 },
                        pts: 300
                    }
                ],
                special: [
                    'Crushing Strength (1)',
                    'Fly',
                    'Inspiring',
                    'Iron Resolve',
                    'Thunderous Charge (1)'
                ],
                isExpanded: false
            }, {
                name: 'Sisterhood Panther Lancers',
                type: 'Cavalry',
                unitOptions: [
                    {
                        unitSize: 'Troop',
                        modelCount: 5,
                        sp: 10,
                        me: 4,
                        ra: 0,
                        de: 3,
                        at: 8,
                        nv: { waver: 11, route: 13 },
                        pts: 115
                    }, {
                        unitSize: 'Regiment',
                        modelCount: 10,
                        sp: 10,
                        me: 4,
                        ra: 0,
                        de: 3,
                        at: 16,
                        nv: { waver: 14, route: 16 },
                        pts: 175
                    }
                ],
                special: [
                    'Iron Resolve',
                    'Nimble',
                    'Thunderous Charge (1)',
                    'Vicious'
                ],
                isExpanded: false
            }
        ]
    };
}
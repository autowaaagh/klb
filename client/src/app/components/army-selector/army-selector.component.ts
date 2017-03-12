import { Component, OnInit } from '@angular/core';

import { ArmyList } from '../../model';

@Component({
    moduleId: module.id,
    selector: 'army-selector',
    templateUrl: 'army-selector.component.html'
})
export class ArmySelectorComponent implements OnInit {
    armyLists: ArmyList[] = [
        {
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
                            pts: 135,
                            special: [
                                'Headstrong',
                                'Iron Resolve',
                                'Thunderous Charge (2)'
                            ]
                        },{
                            unitSize: 'Regiment',
                            modelCount: 10,
                            sp: 8,
                            me: 3,
                            ra: 0,
                            de: 5,
                            at: 16,
                            nv: { waver: 15, route: 17 },
                            pts: 210,
                            special: [
                                'Headstrong',
                                'Iron Resolve',
                                'Thunderous Charge (2)'
                            ]
                        }, {
                            unitSize: 'Horde',
                            modelCount: 20,
                            sp: 8,
                            me: 3,
                            ra: 0,
                            de: 5,
                            at: 32,
                            nv: { waver: 22, route: 24 },
                            pts: 350,
                            special: [
                                'Headstrong',
                                'Iron Resolve',
                                'Thunderous Charge (2)'
                            ]
                        }
                    ]
                }
            ]
        }, {
            name: "Dwarfs",
            units: []
        }
    ];

    armyList: ArmyList;
    constructor() { }

    ngOnInit() { }

    onArmyChange(name: string) {
        this.armyLists.forEach(s => {
            if (s.name == name){
                this.armyList = s;
            }
        });
    }

}
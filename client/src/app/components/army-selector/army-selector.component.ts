import { Component, OnInit } from '@angular/core';

import { ArmyList, Unit } from '../../model';
import { BasileaData } from '../../basilea.data';


@Component({
    moduleId: module.id,
    selector: 'army-selector',
    templateUrl: 'army-selector.component.html',
    styles: [
        '.unit-options-list tr:first-child {background-color: #ccc; font-weight: bold }',
        '.unit-header {background-color: #007ACC; color: #fff; font-weight: bold}',
        '.unit-options-list { width: 100% }'
    ]
})
export class ArmySelectorComponent implements OnInit {
    armyLists: ArmyList[] = [
        new BasileaData().armyList,
        {
            name: "Dwarfs",
            units: []
        }
    ];

    armyList: ArmyList;
    constructor() { }

    ngOnInit() { }

    onArmyChange(name: string) {
        this.armyLists.forEach(s => {
            if (s.name == name) {
                this.armyList = s;
            }
        });
    }

    toggleExpanded(unit: Unit) {
        unit.isExpanded = !unit.isExpanded;
    }
}
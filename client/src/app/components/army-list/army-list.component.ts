import { Http } from '@angular/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ArmyList, Unit, UnitOption, Artefact, UnitUpgrade, Modifier } from '../../model';


@Component({
    moduleId: module.id,
    selector: 'army-list',
    templateUrl: 'army-list.component.html',
    styles: [
        '.component { padding:5px; overflow: auto; }',
        'table { width: 100% } ',
        '.unit-stats-row td:nth-of-type(even) { background-color: #eee }',
        '.table-header {background-color: #ccc; font-weight: bold }',
        '.tbl-list td:first-child { width: 50% }',
        '.tbl-list td:not(:first-child) { width: 50px; text-align:center; }',
        '.special-rules { font-style: italic; font-size: 8pt }',
        'button {  display: inline-block; width: 100%; box-shadow: none;  border-radius: 0px; cursor: default;}',
        '.btn-flat { background-color: #007ACC; color: #fff; border: none; }',
        '.btn-flat:hover { background-color: #0069BB; }',
        '.btn-remove-unit { background-color: #f00; color: #fff; }',
        '.btn-remove-unit:hover { background-color: #d00; }',
        '.unit-sub-row { margin-left: 10px; }',
        '.list-total-points { text-align: right; align: right; }'
        // '.tbl-top-bar button { margin: 0px 2px; }'
    ]
})
export class ArmyListComponent implements OnInit {
    armyList: ArmyList;
    artefacts: Artefact[] = [];
    @Output() printListEvent = new EventEmitter();

    constructor(private http: Http) {
        this.newList();

        this.http.get('data/artefacts.json')
            .subscribe(res => {
                let json = res.json();

                for (var i = 0; i < json.length; i++) {
                    var obj = json[i];
                    let a: Artefact = Object.assign(new Artefact(), obj);
                    this.artefacts.push(a);
                }
            });
    }

    ngOnInit() { }

    addUnitToList(unit: Unit) {
        unit.artefact = this.artefacts[0];
        this.armyList.units.push(unit);

        this.calculateListPoints();
    }

    removeUnit(unit: Unit) {
        this.armyList.units.forEach((u, i) => {
            if (unit === u) {
                this.armyList.units.splice(i, 1);

                this.calculateListPoints();

                return;
            }
        });
    }

    onArtefactChange(unit: Unit) {
        let artefact: Artefact = unit.artefact;

        if (artefact.name !== "- Artefacts -") {
            this.armyList.units.forEach((u, i) => {
                if (u !== unit && u.artefact === artefact) {
                    u.artefact = this.artefacts[0];
                }
            });
        }

        this.calculateListPoints();
    }

    onUpgradeChange(unit: Unit, unitUpgrade: UnitUpgrade) {
        unitUpgrade.unitModifiers.forEach((um, i) => {
            this.applyModifier(unit, um);
        });
        unitUpgrade.unitOptionModifiers.forEach((um, i) => {
            this.applyModifier(unit.unitOptions[0], um);
        });

        this.calculateListPoints();
    }

    applyModifier(obj: any, mod: Modifier) {
        if (mod.action === 'add') {
            obj[mod.element] += mod.newValue;
            mod.newValue = -mod.newValue;
        } else if (mod.action === 'replace') {
            let oldVal = obj[mod.element];
            obj[mod.element] = mod.newValue;
            mod.newValue = oldVal;
        } else if (mod.action === 'add-array') {
            obj[mod.element].push(mod.newValue);
            mod.action = 'remove-array';
        } else if (mod.action === 'remove-array') {
            if ((obj[mod.element]).some((c: any) => c === mod.newValue)) {
                let index = (obj[mod.element]).indexOf(mod.newValue, 0);
                if (index > 0) {
                    obj[mod.element].splice(index, 1);
                    mod.action = 'add-array';
                }
            }
        }
    }

    calculateListPoints() {
        let p: number = 0;

        this.armyList.units.forEach((u, i) => {
            p += u.unitOptions[0].pts;
            if (u.artefact !== null) {
                p += u.artefact.pts;
            }
            if (u.unitUpgrades) {
                u.unitUpgrades.forEach((ug, ugi) => {
                    if (ug.isSelected) {
                        p += ug.pts;
                    }
                });
            }
        });

        this.armyList.points = p;
    }

    newList() {
        this.armyList = {
            name: "New List",
            points: 0,
            units: []
        };

        this.calculateListPoints();
    }

    outputList() {
        let list: ArmyList = (JSON.parse(JSON.stringify(this.armyList)));

        list.units.forEach((u, i) => {
            if (u.artefact && u.artefact.name != '- Artefacts - ') {
                u.unitOptions[0].pts += u.artefact.pts;
            }

            if (u.unitUpgrades) {
                u.unitUpgrades.forEach((uu, j) => {
                    if (uu.isSelected) {
                        u.unitOptions[0].pts += uu.pts;
                    }
                });
            }

            if (u.unitOptions[0].unitSize === 'Single') {
                u.unitOptions[0].unitSize = 'Single Model';
            }
        });

        this.printListEvent.emit(list);
    }
}
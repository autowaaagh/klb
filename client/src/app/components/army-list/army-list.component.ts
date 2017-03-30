import { Http } from '@angular/http';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ArmyList, Unit, UnitOption, Artefact, UnitUpgrade, Modifier } from '../../model';
import { FileLoaderService } from '../../services/file-loader.service';


@Component({
    moduleId: module.id,
    selector: 'army-list',
    templateUrl: 'army-list.component.html',
    styles: [
        '.component { padding:5px; overflow: auto; }',
        'table { width: 100% } ',
        '.unit-stats-row td:nth-of-type(even) { background-color: #eee }',
        '.unit-extras-row { border-bottom: 2px solid; border-color: #aaa; }',
        '.table-header {background-color: #ccc; font-weight: bold }',
        //'.tbl-list td:first-child { width: 50% }',
        '.tbl-list td:first-child { width: 50px; }',
        //'.tbl-list td:nth-child(2) { width: 50% }',
        // '.tbl-list td:not(:first-child) { width: 50px; text-align:center; }',
        '.tbl-list td:not(::nth-child(2)) { width: 50px; text-align:center; }',
        '.special-rules { font-style: italic; font-size: 8pt }',
        'button {  display: inline-block; width: 100%; box-shadow: none;  border-radius: 0px; cursor: default;}',
        '.btn-flat { background-color: #007ACC; color: #fff; border: none; }',
        '.btn-flat:hover { background-color: #0069BB; }',
        '.btn-remove-unit { background-color: #f00; color: #fff; }',
        '.btn-remove-unit:hover { background-color: #d00; }',
        '.unit-sub-row { margin-left: 10px; }',
        '.list-total-points { text-align: right; align: right; }'
    ],
    providers: [FileLoaderService]
})
export class ArmyListComponent implements OnInit {
    army: ArmyList;
    artefacts: Artefact[] = [];
    @Output() printListEvent = new EventEmitter();

    constructor(private http: Http, private fl: FileLoaderService) {
        this.newList();

        fl.getFile('data/artefacts.json', (res) => {
            let json = res.json();

            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                let a: Artefact = Object.assign(new Artefact(), obj);
                this.artefacts.push(a);
            }
        });
    }

    ngOnInit() { }

    findUnit(name: string, callback?: (unit: Unit, index: number) => void) {
        this.army.units.forEach((n, i) => {
            if (n.name === name) {
                if (callback != undefined) {
                    callback(n, i);
                }
            }
        });
    }

    addUnitToList(unit: Unit) {
        unit.artefact = this.artefacts[0];
        this.army.units.push(unit);

        this.calculateListPoints();
    }

    removeUnit(index: number) {
        this.army.units.splice(index, 1);
        this.calculateListPoints();
    }

    moveUp(index: number) {
        this.arrayMove(this.army.units, index, index - 1);
    }

    moveDown(index: number) {
        this.arrayMove(this.army.units, index, index + 1);
    }

    arrayMove(arr: Array<any>, i: number, newi: number): Array<any> {
        console.log(arr);
        console.log(i);
        console.log(newi);
        if (newi < 0 || newi >= arr.length) {
            return arr;
        }

        arr.splice(newi, 0, arr.splice(i, 1)[0]);
        return arr;
    }

    onArtefactChange(unit: Unit) {
        let artefact: Artefact = unit.artefact;

        if (artefact.name !== "- Artefacts -") {
            this.army.units.forEach((u, i) => {
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
            let n: number = Number.parseInt(mod.newValue);
            let n1: number = Number.parseInt(obj[mod.element]);
            obj[mod.element] = n1 + n;
            mod.newValue = -n;
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

        this.army.units.forEach((u, i) => {
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

        this.army.points = p;
    }

    newList() {
        this.army = {
            name: "New List",
            points: 0,
            units: []
        };

        this.calculateListPoints();
    }

    outputList() {
        let list: ArmyList = (JSON.parse(JSON.stringify(this.army)));

        if (this.isListValid(list)) {
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

    isListValid(list: ArmyList): boolean {
        let isValid = true;

        let universalUnlockable = 0;
        let troopUnlockable = 0;
        let monsterUnlockable = 0;
        let heroUnlockable = 0;
        let warengineUnlockable = 0;

        if (list.points > 0) {
            list.units.forEach((u, i) => {
                let unitSize = u.unitOptions[0].unitSize;
                let unitType = u.type;

                if (unitSize === 'Regiment') {
                    universalUnlockable++;
                } else if (unitSize === 'Horde' || unitSize === 'Legion') {
                    troopUnlockable += 2;
                    monsterUnlockable++;
                    heroUnlockable++;
                    warengineUnlockable++;
                } else {
                    if (unitType === 'Monster') {
                        this.reduceUnlockable(universalUnlockable, monsterUnlockable);
                    } else if (unitType.indexOf('Hero') >= 0) {
                        this.reduceUnlockable(universalUnlockable, heroUnlockable);
                    } else if (unitType === 'War Engine') {
                        this.reduceUnlockable(universalUnlockable, warengineUnlockable);
                    }

                    if (unitSize === 'Troop') {
                        this.reduceUnlockable(universalUnlockable, troopUnlockable);
                    }
                }
            });
        } else {
            isValid = false;
        }

        if (universalUnlockable < 0 || troopUnlockable < 0 || monsterUnlockable < 0 || heroUnlockable < 0 || warengineUnlockable < 0) {
            isValid = false;
        }

        console.log(isValid);
        // return isValid;
        return true;
    }

    reduceUnlockable(universal: number, type: number) {
        if (type <= 0) {
            universal--;
        } else {
            type--;
        }
    }
}
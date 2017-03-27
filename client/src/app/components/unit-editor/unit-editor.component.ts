import { Http } from '@angular/http';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';

import { ArmyList, Unit, UnitOption, DataLoader } from '../../model';
import { UnitOptionEditorComponent } from '../unit-option-editor/unit-option-editor.component';
import { UnitUpgradeEditorComponent } from '../unit-upgrade-editor/unit-upgrade-editor.component';

@Component({
    moduleId: module.id,
    selector: 'unit-editor',
    templateUrl: 'unit-editor.component.html',
    styles: [
        '.bordered { border: 1px solid; margin-top: 5px; }',
        '.no-padding { padding: 0px; }',
    ]
})
export class UnitEditorComponent implements OnInit {
    @Input() unit: Unit;
    oldUnit: Unit;
    selectedSpecial: string;

    @Output() unitChangedEvent = new EventEmitter();

    ngDoCheck() {
        let hasChanged = false;

        if (this.unit.name !== this.oldUnit.name) {
            hasChanged = true;
            this.oldUnit.name = this.unit.name;
        }

        if (this.unit.type !== this.oldUnit.type) {
            hasChanged = true;
            this.oldUnit.type = this.unit.type;
        }

        if (this.unit.piercing !== this.oldUnit.piercing) {
            hasChanged = true;
            this.oldUnit.piercing = this.unit.piercing;
        }

        if (this.unit.cs !== this.oldUnit.cs) {
            hasChanged = true;
            this.oldUnit.cs = this.unit.cs;
        }

        if (this.unit.tc !== this.oldUnit.tc) {
            hasChanged = true;
            this.oldUnit.tc = this.unit.tc;
        }

        if (this.unit.special !== this.oldUnit.special) {
            hasChanged = true;
            this.oldUnit.special = this.unit.special;
        }

        // if (this.unit.unitOptions !== this.oldUnit.unitOptions) {
        //     hasChanged = true;
        //     this.oldUnit.unitOptions = this.unit.unitOptions;
        // }

        // if (this.unit.unitUpgrades !== this.oldUnit.unitUpgrades) {
        //     hasChanged = true;
        //     this.oldUnit.unitUpgrades = this.unit.unitUpgrades;
        // }

        if (hasChanged) {
            this.unitChanged();
        }
    }

    constructor() {
        this.unit = new Unit();
        this.oldUnit = new Unit();
    }

    ngOnInit() { }

    findSpecial(name: string, callback?: (name: string, index: number) => void) {
        this.unit.special.forEach((n, i) => {
            if (name === n) {
                if (callback != undefined) {
                    callback(n, i);
                }
            }
        })
    }

    unitChanged() {
        console.log('emit unit-changed event')
        console.log(this.unit.unitUpgrades);
        this.unitChangedEvent.emit();
    }

    addSpecial(input: any) {
        if (this.unit.special == undefined) {
            this.unit.special = [];
        }

        this.unit.special.push(input.value);
        input.value = '';

        this.unitChanged();
    }

    removeSpecial(name: string) {
        this.findSpecial(name, (n, i) => {
            this.unit.special.splice(i, 1);

            this.unitChanged();
        });
    }
}
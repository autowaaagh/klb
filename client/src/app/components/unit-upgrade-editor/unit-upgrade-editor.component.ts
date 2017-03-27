import { Http } from '@angular/http';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';

import { UnitUpgrade, Modifier } from '../../model';

@Component({
    moduleId: module.id,
    selector: 'unit-upgrade-editor',
    templateUrl: 'unit-upgrade-editor.component.html',
    styles: [
        '.bordered { border: solid 1px }',
        '.col-* '
    ]
})
export class UnitUpgradeEditorComponent implements OnInit {
    @Input() upgrades: UnitUpgrade[];
    oldUpgrades: UnitUpgrade[];

    @Output() upgradesChangedEvent = new EventEmitter();

    constructor() {
        this.upgrades = [];
        this.oldUpgrades = [];
    }

    ngOnInit() { }

    ngDoCheck() {
        let hasChanged = false;

        if (this.upgrades != undefined && this.upgrades != null) {
            if (this.upgrades.length < this.oldUpgrades.length) {
                hasChanged = true;
                this.oldUpgrades.length = this.upgrades.length;
            }

            this.upgrades.forEach((u, i) => {
                if (i >= this.oldUpgrades.length) {
                    hasChanged = true;
                    this.oldUpgrades.push(this.getNewUpgrade());
                }

                if (this.oldUpgrades[i].name !== u.name) {
                    hasChanged = true;
                    this.oldUpgrades[i].name = u.name;
                }

                if (this.oldUpgrades[i].pts !== u.pts) {
                    hasChanged = true;
                    this.oldUpgrades[i].pts = u.pts;
                }

                if (this.hasModifierArrayChanged(u.unitModifiers, this.oldUpgrades[i].unitModifiers) == true) {
                    hasChanged = true;
                }

                if (this.hasModifierArrayChanged(u.unitOptionModifiers, this.oldUpgrades[i].unitOptionModifiers) == true) {
                    hasChanged = true;
                }
            });
        }

        if (hasChanged) {
            this.upgradesChanged();
        }
    }

    hasModifierArrayChanged(arr: Modifier[], oldArr: Modifier[]): boolean {
        let hasChanged = false;

        if (arr != undefined && arr != null) {
            if (arr.length < oldArr.length) {
                hasChanged = true;
                oldArr.length = arr.length;
            }

            arr.forEach((a, i) => {
                if (i >= oldArr.length) {
                    hasChanged = true;
                    oldArr.push(this.getNewModifier());
                }

                if (oldArr[i].action !== a.action) {
                    hasChanged = true;
                    oldArr[i].action = a.action;
                }

                if (oldArr[i].element !== a.element) {
                    hasChanged = true;
                    oldArr[i].element = a.element;
                }

                if (oldArr[i].newValue !== a.newValue) {
                    hasChanged = true;
                    oldArr[i].newValue = a.newValue;
                }
            });
        }

        return hasChanged;
    }

    upgradesChanged() {
        console.log('emit upgrades-changed event');
        console.log(this.upgrades);
        this.upgradesChangedEvent.emit();
    }

    getNewUpgrade() {
        let r = new UnitUpgrade();
        r.name = "New Upgrade";
        r.pts = 0;
        r.unitModifiers = [];
        r.unitOptionModifiers = [];
        r.isSelected = false;

        return r;
    }

    getNewModifier() {
        let r = new Modifier();
        r.action = "";
        r.element = "";
        r.newValue = "";

        return r;
    }

    addUpgrade() {
        if (this.upgrades == undefined) {
            this.upgrades = [];
        }
        this.upgrades.push(this.getNewUpgrade());
    }

    removeUpgrade(index: number) {
        if (index != undefined && index > -1) {
            this.upgrades.splice(index, 1);
        }
    }

    addMod(arr: Modifier[]) {
        arr.push(this.getNewModifier());
    }

    removeMod(arr: Modifier[], index: number) {
        arr.splice(index, 1);
    }
}
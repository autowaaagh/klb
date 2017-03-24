import { Http } from '@angular/http';
import { Component, OnInit, Input, Output, EventEmitter, DoCheck } from '@angular/core';

import { UnitUpgrade, Modifier } from '../../model';

@Component({
    moduleId: module.id,
    selector: 'unit-upgrade-editor',
    templateUrl: 'unit-upgrade-editor.component.html',
    styles: [
        '.bordered { border: solid 1px }'
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

        if (hasChanged) {
            this.upgradesChanged();
        }
    }

    upgradesChanged() {
        console.log('emit upgrades-changed event');
        this.upgradesChangedEvent.emit();
    }

    addUpgrade() {

    }

    removeUpgrade() {

    }
}
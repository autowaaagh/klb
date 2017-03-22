import { Http } from '@angular/http';
import { Component, OnInit, Input } from '@angular/core';

import { ArmyList, Unit, UnitOption, DataLoader } from '../../model';

@Component({
    moduleId: module.id,
    selector: 'unit-editor',
    templateUrl: 'unit-editor.component.html'
})
export class UnitEditorComponent implements OnInit {
    @Input() unit: Unit;

    constructor() {
        this.unit = new Unit();
    }

    ngOnInit() { }
}
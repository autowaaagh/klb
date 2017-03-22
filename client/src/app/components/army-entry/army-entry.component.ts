import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { ArmyList, Unit, UnitOption, DataLoader } from '../../model';
import { UnitEditorComponent } from '../unit-editor/unit-editor.component';
import { FileLoaderService } from '../../services/file-loader.service';


@Component({
    moduleId: module.id,
    selector: 'army-entry',
    templateUrl: 'army-entry.component.html',
    styles: [
        ".select-fill-height { heigh:100%; }"
    ],
    providers: [FileLoaderService]
})
export class ArmyEntryComponent implements OnInit {

    constructor() {  }

    ngOnInit() { }
}
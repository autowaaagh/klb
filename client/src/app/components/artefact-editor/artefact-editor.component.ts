import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { ArmyList, Unit, UnitOption, DataLoader } from '../../model';
import { FileLoaderService } from '../../services/file-loader.service';

@Component({
    moduleId: module.id,
    selector: 'artefact-editor',
    templateUrl: 'artefact-editor.component.html',
    styles: [],
    providers: [FileLoaderService]
})

export class ArtefactEditorComponent implements OnInit {
    constructor(private fl: FileLoaderService) { }

    ngOnInit() { }
}
import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { ArmyList, Unit, UnitOption, DataLoader, Artefact } from '../../model';
import { FileLoaderService } from '../../services/file-loader.service';

@Component({
    moduleId: module.id,
    selector: 'artefact-editor',
    templateUrl: 'artefact-editor.component.html',
    styles: [],
    providers: [FileLoaderService]
})

export class ArtefactEditorComponent implements OnInit {
    artefacts: Artefact[] = [];

    constructor(private fl: FileLoaderService) {
        this.loadArtefacts();
    }

    ngOnInit() { }

    onChange() {
        this.writeArtefacts();
    }

    writeArtefacts() {
        this.fl.writeFile('artefacts.json', this.artefacts, (res) => {
            console.log(res);
        })
    }

    loadArtefacts() {
        this.fl.getFile('data/artefacts.json', (res) => {
            let json = res.json();

            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                let a = this.loadArtefact(obj);
                this.artefacts.push(a);
            }
        })
    }

    loadArtefact(json: JSON): Artefact {
        let a = Object.assign(new Artefact(), json);
        return a;
    }

    addNew() {
        let a = new Artefact();
        a.name = "";
        a.pts = 0;
        a.description = "";
        a.validTypes = [];

        this.artefacts.push(a);
        this.onChange();
    }

    remove(index: number) {
        this.artefacts.splice(index, 1);
        this.onChange();
    }
}
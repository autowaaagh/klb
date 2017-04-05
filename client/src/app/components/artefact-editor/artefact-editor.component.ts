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

    loadArtefacts() {
        this.fl.getArtefacts((res) => {
            let json = res.json();

            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                let a = this.loadArtefact(obj);
                this.artefacts.push(a);
            }
        });
    }

    loadArtefact(json: JSON): Artefact {
        let a = new Artefact();
        a.name = json['name'];
        a.description = json['description'];
        a.pts = json['pts'];
        a.validTypes = json['validTypes'];
        a.id = json['_id'];

        return a;
    }

    update(index: number) {
        let a = this.artefacts[index];
        this.fl.updateArtefact(a.id, a);
    }

    createArtefact() {
        let a = new Artefact();
        a.name = "New Artefact";
        a.pts = 0;
        a.description = "";
        a.validTypes = [];

        this.fl.createNewArtefact(a, (res) => {
            let data = res.json();
            a.id = data._id;

            this.artefacts.push(a);
        });
    }

    remove(index: number) {
        let a = this.artefacts[index];
        this.fl.removeArtefact(a.id);
        this.artefacts.splice(index, 1);
    }
}
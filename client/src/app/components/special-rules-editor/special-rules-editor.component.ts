import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { ArmyList, Unit, UnitOption, DataLoader, SpecialRule } from '../../model';
import { FileLoaderService } from '../../services/file-loader.service';

@Component({
    moduleId: module.id,
    selector: 'special-rules-editor',
    templateUrl: 'special-rules-editor.component.html',
    styles: [],
    providers: [FileLoaderService]
})

export class SpecialRulesEditorComponent implements OnInit {
    specials: SpecialRule[] = [];

    constructor(private fl: FileLoaderService) {
        this.loadSpecials();
    }

    ngOnInit() { }

    loadSpecials() {
        this.fl.getSpecialRules((res) => {
            let json = res.json();

            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                let s = this.loadSpecial(obj);
                this.specials.push(s);
            }
        })
    }

    loadSpecial(json: JSON): SpecialRule {
        let sr = new SpecialRule();
        sr.name = json['name'];
        sr.desc = json['desc'];
        sr.id = json['_id'];

        return sr;
    }

    update(index: number) {
        let s = this.specials[index];
        this.fl.updateSpecialRule(s.id, s);
    }

    createNew() {
        let sr = new SpecialRule();
        sr.name = "New Special Rule";
        sr.desc = "";

        this.fl.createNewSpecialRule(sr, (res) => {
            let data = res.json();
            sr.id = data._id;
            
            this.specials.push(sr);
        });
    }

    removeSpecial(index: number) {
        let sr = this.specials[index];
        this.fl.removeSpecialRule(sr.id);
        this.specials.splice(index, 1);
    }
}
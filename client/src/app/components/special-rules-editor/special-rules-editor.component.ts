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

    onChange() {
        this.writeSpecials();
    }

    writeSpecials() {
        this.fl.writeFile('special-rules.json', this.specials, (res) => {
            // console.log(res);
        })
    }

    loadSpecials() {
        this.fl.getFile('data/special-rules.json', (res) => {
            let json = res.json();

            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                let s = this.loadSpecial(obj);
                this.specials.push(s);
            }

        });
    }

    loadSpecial(json: JSON): SpecialRule {
        let sr = new SpecialRule();
        sr.name = json['name'];
        sr.desc = json['desc'];

        return sr;
    }

    addNew() {
        let sr = new SpecialRule();
        sr.name = "";
        sr.desc = "";

        this.specials.push(sr);
        this.onChange();
    }

    removeSpecial(index: number) {
        this.specials.splice(index, 1);
        this.onChange();
    }
}
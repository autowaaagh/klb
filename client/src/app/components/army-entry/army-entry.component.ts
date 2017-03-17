import { Http } from '@angular/http';
import { Component, OnInit } from '@angular/core';

import { ArmyList, Unit, UnitOption, DataLoader } from '../../model';


@Component({
    moduleId: module.id,
    selector: 'army-entry',
    templateUrl: 'army-entry.component.html',
    styles: [
        "#armylist li:hover { font-weight: bold; font-size: 14; }",
    ]
})
export class ArmyEntryComponent implements OnInit {
    armies: DataLoader[] = [];

    constructor(private http: Http) {
        this.http.get('data/armies.json')
            .subscribe(res => {
                let json = res.json();
                console.log(json);
                for (var i = 0; i < json.length; i++) {
                    var obj = json[i];
                    this.loadData(obj);
                }
            });
    }

    ngOnInit() { }

    loadData(json: JSON) {
        console.log(json);
        let dl = new DataLoader();
        dl.name = json['name'];
        dl.loc = json['loc'];

        this.armies.push(dl);
    }
}
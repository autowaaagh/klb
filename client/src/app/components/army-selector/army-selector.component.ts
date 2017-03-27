import { Http } from '@angular/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ArmyList, Unit, UnitOption, DataLoader } from '../../model';
import { FileLoaderService } from '../../services/file-loader.service';


@Component({
    moduleId: module.id,
    selector: 'army-selector',
    templateUrl: 'army-selector.component.html',
    styles: [
        '.component { padding:5px; overflow: auto; }',
        '.unit-options-list tr:not(:first-child) td:nth-of-type(even) { background-color: #eee }',
        '.unit-options-list td:first-child { width: 50% }',
        '.unit-options-list td:not(:first-child) { width: 50px; text-align:center; }',
        '.unit-options-list tr:first-child {background-color: #ccc; font-weight: bold }',
        '.unit-header {background-color: #007ACC; color: #fff; font-weight: bold}',
        '.unit-options-list { width: 100% }',
        '.unit-list { width: 100% }',
        '.unit-options-list tr:not(:first-child):hover td { background-color: #009CEE; color: #fff; }'
    ],
    providers: [FileLoaderService]
})
export class ArmySelectorComponent implements OnInit {
    armyLists: ArmyList[] = [];
    @Output() addUnitEvent = new EventEmitter();
    armyList: ArmyList;

    constructor(private http: Http, private fl: FileLoaderService) {
        fl.getFile('data/armies.json', (res) => {
            let json = res.json();

                for (var i = 0; i < json.length; i++) {
                    var obj = json[i];
                    this.loadData('data/' + obj.file);
                }
        });

        // this.http.get('data/armies.json')
        //     .subscribe(res => {
        //         let json = res.json();

        //         for (var i = 0; i < json.length; i++) {
        //             var obj = json[i];
        //             this.loadData('data/' + obj.file);
        //         }
        //     });
    }

    loadData(loc: string) {
        if (loc && loc !== '') {
            this.http.get(loc)
                .subscribe(r => {
                    let b: ArmyList = Object.assign(new ArmyList(), r.json());
                    this.armyLists.push(b);
                    this.onArmyChange(this.armyLists[0].name);
                });
        }
    }

    ngOnInit() { }

    onArmyChange(name: string) {
        this.armyLists.forEach(s => {
            if (s.name == name) {
                this.armyList = s;
            }
        });
    }

    toggleExpanded(unit: Unit) {
        unit.isExpanded = !unit.isExpanded;
    }

    addUnitOption(unit: Unit, unitOption: UnitOption) {
        let u: Unit = {
            name: unit.name,
            type: unit.type,
            special: unit.special,
            cs: unit.cs,
            tc: unit.tc,
            piercing: unit.piercing,
            unitOptions: [
                unitOption
            ],
            unitUpgrades: unit.unitUpgrades,
            artefact: null,
            isExpanded: false
        };
        let target = (JSON.parse(JSON.stringify(u)));
        this.addUnitEvent.emit(target);
    }

}
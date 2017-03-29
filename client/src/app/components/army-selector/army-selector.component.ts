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
        '.unit-header {background-color: #007ACC; color: #fff; font-weight: bold; }',
        '.unit-options-list { width: 100%; }',
        '.unit-list { width: 100% }',
        '.unit-options-list tr:not(:first-child):hover td { background-color: #009CEE; color: #fff; }'
    ],
    providers: [FileLoaderService]
})
export class ArmySelectorComponent implements OnInit {
    armies: DataLoader[] = [];
    @Output() addUnitEvent = new EventEmitter();
    armyList: ArmyList = new ArmyList();

    constructor(private http: Http, private fl: FileLoaderService) {
        fl.getFile('data/armies.json', (res) => {
            let json = res.json();

            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                this.loadData(obj);

                this.onArmyChange(this.armies[0].name);
            }
        });
    }

    loadData(json: JSON) {

        let dl = new DataLoader();
        dl.name = json['name'];
        dl.file = json['file'];

        console.log('armies');
        console.log(this.armies);
        this.armies.push(dl);
        console.log(this.armies);
    }


    ngOnInit() { }

    findArmy(name: string, callback?: (data: DataLoader, index: number) => void) {
        this.armies.forEach((n, i) => {
            if (n.name === name) {
                if (callback != undefined) {
                    callback(n, i);
                }
            }
        });
    }

    onArmyChange(name: string) {
        this.findArmy(name, (n, i) => {
            this.loadArmyFile(n);
        });
    }

    loadArmyFile(dl: DataLoader) {
        this.fl.getFile('data/' + dl.file, (res) => {
            let json = res.json();
            this.armyList = Object.assign(new ArmyList(), json);
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
import { Http } from '@angular/http';
import { Component, OnInit, Output, Input } from '@angular/core';

import { ArmyList, Unit, UnitOption, DataLoader } from '../../model';
import { FileLoaderService } from '../../services/file-loader.service';

@Component({
    moduleId: module.id,
    selector: 'army-editor',
    templateUrl: 'army-editor.component.html',
    providers: [FileLoaderService]
})
export class ArmyEditorComponent implements OnInit {
    @Input() selected: Unit;
    @Input() army: ArmyList;
    dataLoader: DataLoader;

    constructor(private fl: FileLoaderService) {
        this.army = new ArmyList();
        this.selected = new Unit();
        this.dataLoader = new DataLoader();
    }

    ngOnInit() { }

    findUnit(name: string, callback?: (unit: Unit, index: number) => void) {
        this.army.units.forEach((n, i) => {
            if (n.name === name) {
                if (callback != undefined) {
                    callback(n, i);
                }
            }
        });
    }

    writeArmyFile() {
        console.log('writeArmyFile') ;
        console.log(this.army);
        this.fl.writeFile(this.dataLoader.file, this.army, (res) => {
            console.log(res);
        });
    }

    setSelectedArmy(army: ArmyList) {
        this.army = army;
    }

    loadArmyFile(dl: DataLoader) {
        this.fl.getFile('data/' + dl.file, (res) => {
            this.dataLoader = dl;
            let json = res.json();
            this.army = Object.assign(new ArmyList(), json);

            if (this.army.units != undefined && this.army.units.length > 0) {
                this.selected = this.army.units[0];
            } else {
                this.selected = new Unit();
            }
        });
    }

    addUnit(input: any) {
        // let u = new Unit();
        // u.name = input.value;
        // u.type = "Infantry";
        // u.piercing = 0;
        // u.cs = 0;
        // u.tc = 0;
        // u.unitOptions = [{

        // }]
        let u = {
            name: input.value,
            type: 'Infantry',
            piercing: 0,
            cs: 0,
            tc: 0,
            unitOptions: [{
                unitSize: 'Troop',
                modelCount: 10,
                sp: '5',
                me: '4',
                ra: '-',
                de: '3',
                at: '10',
                nv: {
                    waver: '10',
                    route: '12'
                },
                pts: 100
            }]
        }

        if (u.name !== '' && u.name != undefined) {
            if (this.army.units == undefined) {
                this.army.units = [];
            }

            this.army.units.push(Object.assign(new Unit(), u));
            this.writeArmyFile();
        }
    }

    removeUnit(name: string) {
        this.findUnit(name, (n, i) => {
            this.army.units.splice(i, 1);
            this.writeArmyFile();
        });
    }
}
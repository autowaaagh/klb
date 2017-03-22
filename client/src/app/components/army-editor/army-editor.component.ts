import { Http } from '@angular/http';
import { Component, OnInit, Output } from '@angular/core';

import { ArmyList, Unit, UnitOption, DataLoader } from '../../model';
import { FileLoaderService } from '../../services/file-loader.service';

@Component({
    moduleId: module.id,
    selector: 'army-editor',
    templateUrl: 'army-editor.component.html',
    providers: [FileLoaderService]
})
export class ArmyEditorComponent implements OnInit {
    selected: Unit;
    army: ArmyList;
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
        let u = new Unit();
        u.name = input.value;

        if (u.name !== '' && u.name != undefined) {
            if (this.army.units == undefined) {
                this.army.units = [];
            }

            this.army.units.push(u);
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
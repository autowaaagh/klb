import { Http } from '@angular/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { ArmyList, Unit, UnitOption, DataLoader } from '../../model';
import { FileLoaderService } from '../../services/file-loader.service';

@Component({
    moduleId: module.id,
    selector: 'armies-editor',
    templateUrl: 'armies-editor.component.html',
    providers: [FileLoaderService]
})
export class ArmiesEditorComponent implements OnInit {
    armies: DataLoader[] = [];
    selectedArmy: ArmyList = new ArmyList();

    @Output() armyChangeEvent = new EventEmitter();

    constructor(private fl: FileLoaderService) {
        // fl.getFile('data/armies.json', (res) => {
        //     let json = res.json();
        //     json.sort(this.compare);

        //     for (var i = 0; i < json.length; i++) {
        //         var obj = json[i];
        //         this.loadData(obj);

        //         if (i === 0) {
        //             this.selectArmy(0);
        //             // this.selectedArmy.name = this.armies[0].name;
        //             // this.onArmyChange(this.armies[0].name);
        //         }
        //     }
        // });

        fl.getArmies((res) => {
            let json = res.json();

            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                this.loadData(obj);

                if (i == 0) {
                    this.selectArmy(0);
                }
            }
        })
    }

    ngOnInit() { }

    selectArmy(i: number = -1) {
        if (i < 0) {
            i = this.armies.length - 1;
        }
        let name = this.armies[i].name;

        this.selectedArmy.name = name;
        this.onArmyChange(name);
    }

    findArmy(name: string, callback?: (data: DataLoader, index: number) => void) {
        this.armies.forEach((n, i) => {
            if (n.name === name) {
                if (callback != undefined) {
                    callback(n, i);
                }
            }
        });
    }

    compare(a: DataLoader, b: DataLoader): number {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    }

    writeArmiesFile() {
        // this.fl.writeFile('armies.json', this.armies);
    }

    loadData(json: JSON) {
        let dl = new DataLoader();
        dl.name = json['name'];
        // dl.file = json['file'];
        dl.id = json['_id'];

        this.armies.push(dl);
    }

    onArmyChange(name: string) {
        this.findArmy(name, (n, i) => {
            this.armyChangeEvent.emit(n);
        });
    }

    addArmy(input: any) {
        let dl = new DataLoader();
        dl.name = input.value;
        dl.file = 'army-' + dl.name.replace(' ', '-').toLocaleLowerCase() + '.json';

        if (dl.name !== '' && dl.name != undefined) {
            if (this.armies == undefined) {
                this.armies = [];
            }

            this.armies.push(dl);

            let a = new ArmyList();
            a.name = dl.name;
            a.points = 0;

            this.fl.createNewArmy(a);
            // this.fl.writeFile(dl.file, a);            
            // this.writeArmiesFile();

            // this.selectedArmy.name = this.armies[this.armies.length - 1].name;
            this.selectArmy();

            input.value = '';
            input.focus();
        }
    }

    removeArmy(name: string) {
        this.findArmy(name, (n, i) => {
            this.armies.splice(i, 1);

            // this.writeArmiesFile();
            // this.fl.deleteFile(n.file);

            this.fl.removeArmy(n.id);

            // this.selectedArmy.name = this.armies[this.armies.length - 1].name;
            this.selectArmy();
        });
    }
}
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
    newArmy: DataLoader = new DataLoader();
    newUnit: Unit = new Unit();

    selectedArmy: ArmyList = new ArmyList();    

    constructor(private http: Http) {
        this.http.get('data/armies.json')
            .subscribe(res => {
                let json = res.json();
                for (var i = 0; i < json.length; i++) {
                    var obj = json[i];
                    this.loadData(obj);
                }
            });
    }

    ngOnInit() { }

    loadData(json: JSON) {
        let dl = new DataLoader();
        dl.name = json['name'];
        dl.file = json['file'];

        this.armies.push(dl);
    }

    btnAddNewArmyClick(input: any) {
        let dl: DataLoader = JSON.parse(JSON.stringify(this.newArmy));
        dl.file = 'army-' + dl.name.replace(' ', '-').toLocaleLowerCase() + '.json';

        if (dl && dl.name !== '' && dl.name != undefined) {
            this.armies.push(dl);

            let a = new ArmyList();
            a.name = this.newArmy.name;
            a.points = 0;

            this.http.post('/' + dl.file, a).subscribe(res => { console.log(res); });
            this.http.post('/armies.json', this.armies).subscribe(res => { console.log(res); });

            this.newArmy.name = '';
            this.newArmy.file = '';
            input.focus();
        }
    }

    btnRemoveArmyClick(index: number) {
        let dl: DataLoader = JSON.parse(JSON.stringify(this.armies[index]));
        this.armies.splice(index, 1);

        this.http.post('/armies.json', this.armies).subscribe(res => { console.log(res); });
        this.http.delete('/' + dl.file).subscribe(res => { console.log(res); });
    }

    btnEditUnitsClick(index: number) {
        this.http.get('data/' + this.armies[index].file)
            .subscribe(res => {
                let json = res.json();
                this.selectedArmy = Object.assign(new ArmyList(), json);
            }, (err) => {
                console.log(err);
            });

    }

    btnAddNewUnitClick(input: any) {
        let u: Unit = JSON.parse(JSON.stringify(this.newUnit));
        
        if (u && u.name !== '' && u.name != undefined) {
            this.selectedArmy.units.push(u);
        }
    }
}
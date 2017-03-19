"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var http_1 = require('@angular/http');
var core_1 = require('@angular/core');
var model_1 = require('../../model');
var ArmyEntryComponent = (function () {
    function ArmyEntryComponent(http) {
        var _this = this;
        this.http = http;
        this.armies = [];
        this.newArmy = new model_1.DataLoader();
        this.newUnit = new model_1.Unit();
        this.selectedArmy = new model_1.ArmyList();
        this.http.get('data/armies.json')
            .subscribe(function (res) {
            var json = res.json();
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                _this.loadData(obj);
            }
        });
    }
    ArmyEntryComponent.prototype.ngOnInit = function () { };
    ArmyEntryComponent.prototype.loadData = function (json) {
        var dl = new model_1.DataLoader();
        dl.name = json['name'];
        dl.file = json['file'];
        this.armies.push(dl);
    };
    ArmyEntryComponent.prototype.btnAddNewArmyClick = function (input) {
        var dl = JSON.parse(JSON.stringify(this.newArmy));
        dl.file = 'army-' + dl.name.replace(' ', '-').toLocaleLowerCase() + '.json';
        if (dl && dl.name !== '' && dl.name != undefined) {
            this.armies.push(dl);
            var a = new model_1.ArmyList();
            a.name = this.newArmy.name;
            a.points = 0;
            this.http.post('/' + dl.file, a).subscribe(function (res) { console.log(res); });
            this.http.post('/armies.json', this.armies).subscribe(function (res) { console.log(res); });
            this.newArmy.name = '';
            this.newArmy.file = '';
            input.focus();
        }
    };
    ArmyEntryComponent.prototype.btnRemoveArmyClick = function (index) {
        var dl = JSON.parse(JSON.stringify(this.armies[index]));
        this.armies.splice(index, 1);
        this.http.post('/armies.json', this.armies).subscribe(function (res) { console.log(res); });
        this.http.delete('/' + dl.file).subscribe(function (res) { console.log(res); });
    };
    ArmyEntryComponent.prototype.btnEditUnitsClick = function (index) {
        var _this = this;
        this.http.get('data/' + this.armies[index].file)
            .subscribe(function (res) {
            var json = res.json();
            _this.selectedArmy = Object.assign(new model_1.ArmyList(), json);
        }, function (err) {
            console.log(err);
        });
    };
    ArmyEntryComponent.prototype.btnAddNewUnitClick = function (input) {
        var u = JSON.parse(JSON.stringify(this.newUnit));
        if (u && u.name !== '' && u.name != undefined) {
            this.selectedArmy.units.push(u);
        }
    };
    ArmyEntryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'army-entry',
            templateUrl: 'army-entry.component.html',
            styles: [
                "#armylist li:hover { font-weight: bold; font-size: 14; }",
            ]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ArmyEntryComponent);
    return ArmyEntryComponent;
}());
exports.ArmyEntryComponent = ArmyEntryComponent;
//# sourceMappingURL=army-entry.component.js.map
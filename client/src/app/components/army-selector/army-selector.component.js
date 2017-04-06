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
var file_loader_service_1 = require('../../services/file-loader.service');
var ArmySelectorComponent = (function () {
    function ArmySelectorComponent(http, fl) {
        // fl.getFile('data/armies.json', (res) => {
        //     let json = res.json();
        //     json.sort(this.compare);
        var _this = this;
        this.http = http;
        this.fl = fl;
        this.armies = [];
        this.addUnitEvent = new core_1.EventEmitter();
        this.armyList = new model_1.ArmyList();
        //     for (var i = 0; i < json.length; i++) {
        //         var obj = json[i];
        //         this.loadData(obj);
        //         this.onArmyChange(this.armies[0].name);
        //     }
        // });
        fl.getArmies(function (res) {
            var json = res.json();
            console.log(json);
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                _this.loadData(obj);
                _this.onArmyChange(_this.armies[0].name);
            }
        });
    }
    ArmySelectorComponent.prototype.loadData = function (json) {
        var dl = new model_1.DataLoader();
        dl.name = json['name'];
        // dl.file = json['file'];
        dl.id = json['_id'];
        // console.log('armies');
        // console.log(this.armies);
        this.armies.push(dl);
        // console.log(this.armies);
    };
    ArmySelectorComponent.prototype.ngOnInit = function () { };
    ArmySelectorComponent.prototype.findArmy = function (name, callback) {
        this.armies.forEach(function (n, i) {
            if (n.name === name) {
                if (callback != undefined) {
                    callback(n, i);
                }
            }
        });
    };
    ArmySelectorComponent.prototype.compare = function (a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    };
    ArmySelectorComponent.prototype.compareUnitName = function (a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    };
    ArmySelectorComponent.prototype.compareUnitType = function (a, b) {
        if (a.unitType < b.unitType)
            return -1;
        if (a.unitType > b.unitType)
            return 1;
        return 0;
    };
    ArmySelectorComponent.prototype.onArmyChange = function (name) {
        var _this = this;
        this.findArmy(name, function (n, i) {
            _this.loadArmyFile(n);
        });
    };
    ArmySelectorComponent.prototype.onSortChange = function (a) {
        switch (a) {
            case "name":
                this.armyList.units.sort(this.compareUnitName);
                break;
            case "troop":
                this.armyList.units.sort(this.compareUnitType);
                break;
            default:
                break;
        }
    };
    ArmySelectorComponent.prototype.loadArmyFile = function (dl) {
        var _this = this;
        // this.fl.getFile('data/' + dl.file, (res) => {
        //     let json = res.json();
        //     this.armyList = Object.assign(new ArmyList(), json);
        // });
        this.fl.getArmy(dl.id, function (res) {
            var json = res.json();
            _this.armyList = Object.assign(new model_1.ArmyList(), json);
        });
    };
    ArmySelectorComponent.prototype.toggleExpanded = function (unit) {
        unit.isExpanded = !unit.isExpanded;
    };
    ArmySelectorComponent.prototype.addUnitOption = function (unit, unitOption) {
        var u = {
            name: unit.name,
            unitType: unit.unitType,
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
        var target = (JSON.parse(JSON.stringify(u)));
        this.addUnitEvent.emit(target);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ArmySelectorComponent.prototype, "addUnitEvent", void 0);
    ArmySelectorComponent = __decorate([
        core_1.Component({
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
            ],
            providers: [file_loader_service_1.FileLoaderService]
        }), 
        __metadata('design:paramtypes', [http_1.Http, file_loader_service_1.FileLoaderService])
    ], ArmySelectorComponent);
    return ArmySelectorComponent;
}());
exports.ArmySelectorComponent = ArmySelectorComponent;
//# sourceMappingURL=army-selector.component.js.map
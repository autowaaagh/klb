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
var core_1 = require('@angular/core');
var model_1 = require('../../model');
var file_loader_service_1 = require('../../services/file-loader.service');
var ArmyEditorComponent = (function () {
    function ArmyEditorComponent(fl) {
        this.fl = fl;
        this.army = new model_1.ArmyList();
        this.selected = new model_1.Unit();
        this.dataLoader = new model_1.DataLoader();
    }
    ArmyEditorComponent.prototype.ngOnInit = function () { };
    ArmyEditorComponent.prototype.findUnit = function (name, callback) {
        this.army.units.forEach(function (n, i) {
            if (n.name === name) {
                if (callback != undefined) {
                    callback(n, i);
                }
            }
        });
    };
    ArmyEditorComponent.prototype.compare = function (a, b) {
        if (a.name < b.name)
            return -1;
        if (a.name > b.name)
            return 1;
        return 0;
    };
    ArmyEditorComponent.prototype.writeArmyFile = function () {
        // this.fl.writeFile(this.dataLoader.file, this.army, (res) => {
        //     // console.log(res);
        // });
        this.fl.updateArmy(this.dataLoader.id, this.army);
    };
    ArmyEditorComponent.prototype.setSelectedArmy = function (army) {
        this.army = army;
    };
    ArmyEditorComponent.prototype.loadArmyFile = function (dl) {
        var _this = this;
        // this.fl.getFile('data/' + dl.file, (res) => {
        this.fl.getArmy(dl.id, function (res) {
            _this.dataLoader = dl;
            var json = res.json();
            _this.army = Object.assign(new model_1.ArmyList(), json);
            _this.army.units.sort(_this.compare);
            if (_this.army.units != undefined && _this.army.units.length > 0) {
                _this.selected = _this.army.units[0];
            }
            else {
                _this.selected = new model_1.Unit();
            }
        });
    };
    ArmyEditorComponent.prototype.addUnit = function (input) {
        var u = new model_1.Unit();
        u.name = input.value;
        u.unitType = 'Infantry';
        u.piercing = 0;
        u.cs = 0;
        u.tc = 0;
        u.unitOptions = [{
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
            }];
        u.unitUpgrades = [];
        u.artefact = null;
        u.isExpanded = false;
        if (u.name !== '' && u.name != undefined) {
            if (this.army.units == undefined) {
                this.army.units = [];
            }
            input.value = '';
            this.army.units.push(u);
            this.selected = this.army.units[this.army.units.length - 1];
            this.writeArmyFile();
        }
    };
    ArmyEditorComponent.prototype.removeUnit = function (name) {
        var _this = this;
        this.findUnit(name, function (n, i) {
            _this.army.units.splice(i, 1);
            _this.selected = _this.army.units[_this.army.units.length - 1];
            _this.writeArmyFile();
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', model_1.Unit)
    ], ArmyEditorComponent.prototype, "selected", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', model_1.ArmyList)
    ], ArmyEditorComponent.prototype, "army", void 0);
    ArmyEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'army-editor',
            templateUrl: 'army-editor.component.html',
            styles: [],
            providers: [file_loader_service_1.FileLoaderService]
        }), 
        __metadata('design:paramtypes', [file_loader_service_1.FileLoaderService])
    ], ArmyEditorComponent);
    return ArmyEditorComponent;
}());
exports.ArmyEditorComponent = ArmyEditorComponent;
//# sourceMappingURL=army-editor.component.js.map
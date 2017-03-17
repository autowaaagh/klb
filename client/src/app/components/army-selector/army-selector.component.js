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
var ArmySelectorComponent = (function () {
    function ArmySelectorComponent(http) {
        var _this = this;
        this.http = http;
        this.armyLists = [];
        this.addUnitEvent = new core_1.EventEmitter();
        this.http.get('data/armies.json')
            .subscribe(function (res) {
            var json = res.json();
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                _this.loadData(obj.loc);
            }
        });
    }
    ArmySelectorComponent.prototype.loadData = function (loc) {
        var _this = this;
        if (loc && loc !== '') {
            this.http.get(loc)
                .subscribe(function (r) {
                var b = Object.assign(new model_1.ArmyList(), r.json());
                _this.armyLists.push(b);
                _this.onArmyChange(_this.armyLists[0].name);
            });
        }
    };
    ArmySelectorComponent.prototype.ngOnInit = function () { };
    ArmySelectorComponent.prototype.onArmyChange = function (name) {
        var _this = this;
        this.armyLists.forEach(function (s) {
            if (s.name == name) {
                _this.armyList = s;
            }
        });
    };
    ArmySelectorComponent.prototype.toggleExpanded = function (unit) {
        unit.isExpanded = !unit.isExpanded;
    };
    ArmySelectorComponent.prototype.addUnitOption = function (unit, unitOption) {
        var u = {
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
                '.unit-header {background-color: #007ACC; color: #fff; font-weight: bold}',
                '.unit-options-list { width: 100% }',
                '.unit-list { width: 100% }',
                '.unit-options-list tr:not(:first-child):hover td { background-color: #009CEE; color: #fff; }'
            ]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ArmySelectorComponent);
    return ArmySelectorComponent;
}());
exports.ArmySelectorComponent = ArmySelectorComponent;
//# sourceMappingURL=army-selector.component.js.map
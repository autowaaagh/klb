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
var basilea_data_1 = require('../../basilea.data');
var ArmySelectorComponent = (function () {
    function ArmySelectorComponent() {
        this.armyLists = [
            new basilea_data_1.BasileaData().armyList,
            {
                name: "Dwarfs",
                units: []
            }
        ];
    }
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
    ArmySelectorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'army-selector',
            templateUrl: 'army-selector.component.html',
            styles: [
                '.unit-options-list tr:first-child {background-color: #ccc; font-weight: bold }',
                '.unit-header {background-color: #007ACC; color: #fff; font-weight: bold}',
                '.unit-options-list { width: 100% }'
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ArmySelectorComponent);
    return ArmySelectorComponent;
}());
exports.ArmySelectorComponent = ArmySelectorComponent;
//# sourceMappingURL=army-selector.component.js.map
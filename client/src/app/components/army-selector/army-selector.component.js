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
var ArmySelectorComponent = (function () {
    function ArmySelectorComponent() {
        this.armyLists = [
            {
                name: "Basilea",
                units: [
                    {
                        name: 'Paladin Knights',
                        type: 'Cavalry',
                        unitOptions: [
                            {
                                unitSize: 'Troop',
                                modelCount: 5,
                                sp: 8,
                                me: 3,
                                ra: 0,
                                de: 5,
                                at: 8,
                                nv: { waver: 12, route: 14 },
                                pts: 135,
                                special: [
                                    'Headstrong',
                                    'Iron Resolve',
                                    'Thunderous Charge (2)'
                                ]
                            }, {
                                unitSize: 'Regiment',
                                modelCount: 10,
                                sp: 8,
                                me: 3,
                                ra: 0,
                                de: 5,
                                at: 16,
                                nv: { waver: 15, route: 17 },
                                pts: 210,
                                special: [
                                    'Headstrong',
                                    'Iron Resolve',
                                    'Thunderous Charge (2)'
                                ]
                            }, {
                                unitSize: 'Horde',
                                modelCount: 20,
                                sp: 8,
                                me: 3,
                                ra: 0,
                                de: 5,
                                at: 32,
                                nv: { waver: 22, route: 24 },
                                pts: 350,
                                special: [
                                    'Headstrong',
                                    'Iron Resolve',
                                    'Thunderous Charge (2)'
                                ]
                            }
                        ]
                    }
                ]
            }, {
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
    ArmySelectorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'army-selector',
            templateUrl: 'army-selector.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], ArmySelectorComponent);
    return ArmySelectorComponent;
}());
exports.ArmySelectorComponent = ArmySelectorComponent;
//# sourceMappingURL=army-selector.component.js.map
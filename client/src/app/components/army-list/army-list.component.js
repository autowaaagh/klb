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
var ArmyListComponent = (function () {
    function ArmyListComponent(http) {
        var _this = this;
        this.http = http;
        this.artefacts = [];
        this.printListEvent = new core_1.EventEmitter();
        this.newList();
        this.http.get('data/artefacts.json')
            .subscribe(function (res) {
            var json = res.json();
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                var a = Object.assign(new model_1.Artefact(), obj);
                _this.artefacts.push(a);
            }
        });
    }
    ArmyListComponent.prototype.ngOnInit = function () { };
    ArmyListComponent.prototype.addUnitToList = function (unit) {
        unit.artefact = this.artefacts[0];
        this.armyList.units.push(unit);
        this.calculateListPoints();
    };
    ArmyListComponent.prototype.removeUnit = function (unit) {
        var _this = this;
        this.armyList.units.forEach(function (u, i) {
            if (unit === u) {
                _this.armyList.units.splice(i, 1);
                _this.calculateListPoints();
                return;
            }
        });
    };
    ArmyListComponent.prototype.onArtefactChange = function (unit) {
        var _this = this;
        var artefact = unit.artefact;
        if (artefact.name !== "- Artefacts -") {
            this.armyList.units.forEach(function (u, i) {
                if (u !== unit && u.artefact === artefact) {
                    u.artefact = _this.artefacts[0];
                }
            });
        }
        this.calculateListPoints();
    };
    ArmyListComponent.prototype.onUpgradeChange = function (unit, unitUpgrade) {
        var _this = this;
        unitUpgrade.unitModifiers.forEach(function (um, i) {
            _this.applyModifier(unit, um);
        });
        unitUpgrade.unitOptionModifiers.forEach(function (um, i) {
            _this.applyModifier(unit.unitOptions[0], um);
        });
        this.calculateListPoints();
    };
    ArmyListComponent.prototype.applyModifier = function (obj, mod) {
        if (mod.action === 'add') {
            obj[mod.element] += mod.newValue;
            mod.newValue = -mod.newValue;
        }
        else if (mod.action === 'replace') {
            var oldVal = obj[mod.element];
            obj[mod.element] = mod.newValue;
            mod.newValue = oldVal;
        }
        else if (mod.action === 'add-array') {
            obj[mod.element].push(mod.newValue);
            mod.action = 'remove-array';
        }
        else if (mod.action === 'remove-array') {
            if ((obj[mod.element]).some(function (c) { return c === mod.newValue; })) {
                var index = (obj[mod.element]).indexOf(mod.newValue, 0);
                if (index > 0) {
                    obj[mod.element].splice(index, 1);
                    mod.action = 'add-array';
                }
            }
        }
    };
    ArmyListComponent.prototype.calculateListPoints = function () {
        var p = 0;
        this.armyList.units.forEach(function (u, i) {
            p += u.unitOptions[0].pts;
            if (u.artefact !== null) {
                p += u.artefact.pts;
            }
            if (u.unitUpgrades) {
                u.unitUpgrades.forEach(function (ug, ugi) {
                    if (ug.isSelected) {
                        p += ug.pts;
                    }
                });
            }
        });
        this.armyList.points = p;
    };
    ArmyListComponent.prototype.newList = function () {
        this.armyList = {
            name: "New List",
            points: 0,
            units: []
        };
        this.calculateListPoints();
    };
    ArmyListComponent.prototype.outputList = function () {
        var list = (JSON.parse(JSON.stringify(this.armyList)));
        list.units.forEach(function (u, i) {
            if (u.artefact && u.artefact.name != '- Artefacts - ') {
                u.unitOptions[0].pts += u.artefact.pts;
            }
            if (u.unitUpgrades) {
                u.unitUpgrades.forEach(function (uu, j) {
                    if (uu.isSelected) {
                        u.unitOptions[0].pts += uu.pts;
                    }
                });
            }
            if (u.unitOptions[0].unitSize === 'Single') {
                u.unitOptions[0].unitSize = 'Single Model';
            }
        });
        this.printListEvent.emit(list);
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ArmyListComponent.prototype, "printListEvent", void 0);
    ArmyListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'army-list',
            templateUrl: 'army-list.component.html',
            styles: [
                '.component { padding:5px; overflow: auto; }',
                'table { width: 100% } ',
                '.unit-stats-row td:nth-of-type(even) { background-color: #eee }',
                '.table-header {background-color: #ccc; font-weight: bold }',
                '.tbl-list td:first-child { width: 50% }',
                '.tbl-list td:not(:first-child) { width: 50px; text-align:center; }',
                '.special-rules { font-style: italic; font-size: 8pt }',
                'button {  display: inline-block; width: 100%; box-shadow: none;  border-radius: 0px; cursor: default;}',
                '.btn-flat { background-color: #007ACC; color: #fff; border: none; }',
                '.btn-flat:hover { background-color: #0069BB; }',
                '.btn-remove-unit { background-color: #f00; color: #fff; }',
                '.btn-remove-unit:hover { background-color: #d00; }',
                '.unit-sub-row { margin-left: 10px; }',
                '.list-total-points { text-align: right; align: right; }'
            ]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ArmyListComponent);
    return ArmyListComponent;
}());
exports.ArmyListComponent = ArmyListComponent;
//# sourceMappingURL=army-list.component.js.map
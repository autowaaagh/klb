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
var ArmyListComponent = (function () {
    function ArmyListComponent(http, fl) {
        var _this = this;
        this.http = http;
        this.fl = fl;
        this.artefacts = [];
        this.printListEvent = new core_1.EventEmitter();
        this.newList();
        fl.getFile('data/artefacts.json', function (res) {
            var json = res.json();
            console.log(json);
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                var a = Object.assign(new model_1.Artefact(), obj);
                _this.artefacts.push(a);
            }
        });
    }
    ArmyListComponent.prototype.ngOnInit = function () { };
    ArmyListComponent.prototype.findUnit = function (name, callback) {
        this.army.units.forEach(function (n, i) {
            if (n.name === name) {
                if (callback != undefined) {
                    callback(n, i);
                }
            }
        });
    };
    ArmyListComponent.prototype.addUnitToList = function (unit) {
        this.army.units.push(unit);
        this.calculateListPoints();
    };
    ArmyListComponent.prototype.removeUnit = function (index) {
        this.army.units.splice(index, 1);
        this.calculateListPoints();
    };
    ArmyListComponent.prototype.moveUp = function (index) {
        this.arrayMove(this.army.units, index, index - 1);
    };
    ArmyListComponent.prototype.moveDown = function (index) {
        this.arrayMove(this.army.units, index, index + 1);
    };
    ArmyListComponent.prototype.arrayMove = function (arr, i, newi) {
        console.log(arr);
        console.log(i);
        console.log(newi);
        if (newi < 0 || newi >= arr.length) {
            return arr;
        }
        arr.splice(newi, 0, arr.splice(i, 1)[0]);
        return arr;
    };
    ArmyListComponent.prototype.onArtefactChange = function (unit) {
        var _this = this;
        var artefact = unit.artefact;
        if (artefact.name !== "- Artefacts -") {
            this.army.units.forEach(function (u, i) {
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
            var n = Number.parseInt(mod.newValue);
            var n1 = Number.parseInt(obj[mod.element]);
            obj[mod.element] = n1 + n;
            mod.newValue = -n;
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
        this.army.units.forEach(function (u, i) {
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
        this.army.points = p;
    };
    ArmyListComponent.prototype.newList = function () {
        this.army = {
            name: "New List",
            points: 0,
            units: []
        };
        this.calculateListPoints();
    };
    ArmyListComponent.prototype.outputList = function () {
        var list = (JSON.parse(JSON.stringify(this.army)));
        if (this.isListValid(list)) {
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
        }
    };
    ArmyListComponent.prototype.isListValid = function (list) {
        var _this = this;
        var isValid = true;
        var universalUnlockable = 0;
        var troopUnlockable = 0;
        var monsterUnlockable = 0;
        var heroUnlockable = 0;
        var warengineUnlockable = 0;
        if (list.points > 0) {
            list.units.forEach(function (u, i) {
                var unitSize = u.unitOptions[0].unitSize;
                var unitType = u.type;
                if (unitSize === 'Regiment') {
                    universalUnlockable++;
                }
                else if (unitSize === 'Horde' || unitSize === 'Legion') {
                    troopUnlockable += 2;
                    monsterUnlockable++;
                    heroUnlockable++;
                    warengineUnlockable++;
                }
                else {
                    if (unitType === 'Monster') {
                        _this.reduceUnlockable(universalUnlockable, monsterUnlockable);
                    }
                    else if (unitType.indexOf('Hero') >= 0) {
                        _this.reduceUnlockable(universalUnlockable, heroUnlockable);
                    }
                    else if (unitType === 'War Engine') {
                        _this.reduceUnlockable(universalUnlockable, warengineUnlockable);
                    }
                    if (unitSize === 'Troop') {
                        _this.reduceUnlockable(universalUnlockable, troopUnlockable);
                    }
                }
            });
        }
        else {
            isValid = false;
        }
        if (universalUnlockable < 0 || troopUnlockable < 0 || monsterUnlockable < 0 || heroUnlockable < 0 || warengineUnlockable < 0) {
            isValid = false;
        }
        console.log(isValid);
        // return isValid;
        return true;
    };
    ArmyListComponent.prototype.reduceUnlockable = function (universal, type) {
        if (type <= 0) {
            universal--;
        }
        else {
            type--;
        }
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
                '.unit-extras-row { border-bottom: 2px solid; border-color: #aaa; }',
                '.table-header {background-color: #ccc; font-weight: bold }',
                //'.tbl-list td:first-child { width: 50% }',
                '.tbl-list td:first-child { width: 50px; }',
                //'.tbl-list td:nth-child(2) { width: 50% }',
                // '.tbl-list td:not(:first-child) { width: 50px; text-align:center; }',
                '.tbl-list td:not(::nth-child(2)) { width: 50px; text-align:center; }',
                '.special-rules { font-style: italic; font-size: 8pt }',
                'button {  display: inline-block; width: 100%; box-shadow: none;  border-radius: 0px; cursor: default;}',
                '.btn-flat { background-color: #007ACC; color: #fff; border: none; }',
                '.btn-flat:hover { background-color: #0069BB; }',
                '.btn-remove-unit { background-color: #f00; color: #fff; }',
                '.btn-remove-unit:hover { background-color: #d00; }',
                '.unit-sub-row { margin-left: 10px; }',
                '.list-total-points { text-align: right; align: right; }'
            ],
            providers: [file_loader_service_1.FileLoaderService]
        }), 
        __metadata('design:paramtypes', [http_1.Http, file_loader_service_1.FileLoaderService])
    ], ArmyListComponent);
    return ArmyListComponent;
}());
exports.ArmyListComponent = ArmyListComponent;
//# sourceMappingURL=army-list.component.js.map
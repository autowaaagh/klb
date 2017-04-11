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
        this.http = http;
        this.fl = fl;
        this.artefacts = [];
        this.isValidList = true;
        this.validationErrors = [];
        this.printListEvent = new core_1.EventEmitter();
        this.newList();
        this.loadArtefacts();
    }
    ArmyListComponent.prototype.loadArtefacts = function () {
        var _this = this;
        this.fl.getArtefacts(function (res) {
            var json = res.json();
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                var a = _this.loadArtefact(obj);
                _this.artefacts.push(a);
            }
        });
    };
    ArmyListComponent.prototype.loadArtefact = function (json) {
        var a = new model_1.Artefact();
        a.name = json['name'];
        a.description = json['description'];
        a.pts = json['pts'];
        a.validTypes = json['validTypes'];
        a.id = json['_id'];
        return a;
    };
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
        this.isValidList = this.isListValid(this.army);
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
        this.isValidList = this.isListValid(list);
        if (!this.isValidList) { }
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
    ArmyListComponent.prototype.isListValid = function (list) {
        var _this = this;
        var isValid = true;
        var heroes = 0;
        var monsters = 0;
        var troops = 0;
        var shared = 0;
        var warengines = 0;
        this.validationErrors = [];
        if (list.points > 0) {
            list.units.forEach(function (u, i) {
                var unitSize = u.unitOptions[0].unitSize;
                var unitType = u.unitType;
                if (u.name.indexOf('[1]') >= 0) {
                    list.units.forEach(function (u1, i1) {
                        if (u1.name === u.name && i1 !== i) {
                            isValid = false;
                            var dupname = "You can have only 1 '" + u.name + "'";
                            if (_this.validationErrors.indexOf(dupname) < 0) {
                                _this.validationErrors.push(dupname);
                            }
                        }
                    });
                }
                if (unitSize === 'Regiment') {
                    shared++;
                    troops += 2;
                }
                else if (unitSize === 'Horde' || unitSize === 'Legion') {
                    troops += 4;
                    heroes++;
                    monsters++;
                    warengines++;
                }
                else {
                    if (unitSize === 'Troop') {
                        troops--;
                    }
                    else {
                        if (unitType === 'Monster') {
                            monsters--;
                        }
                        else if (unitType.indexOf('Hero') >= 0) {
                            heroes--;
                        }
                        else if (unitType === 'War Engine') {
                            warengines--;
                        }
                    }
                }
            });
            if (heroes < 0 || monsters < 0 || warengines < 0) {
                while (shared > 0) {
                    if (heroes < 0) {
                        heroes++;
                        shared--;
                    }
                    else if (monsters < 0) {
                        monsters++;
                        shared--;
                    }
                    else if (warengines < 0) {
                        warengines++;
                        shared--;
                    }
                    else {
                        shared = 0;
                    }
                }
            }
        }
        else {
        }
        if (heroes < 0) {
            isValid = false;
            this.validationErrors.push('Too many Heroes, add more regiments/hordes');
        }
        if (monsters < 0) {
            isValid = false;
            this.validationErrors.push('Too many Monsters, add more regiments/hordes');
        }
        if (troops < 0) {
            isValid = false;
            this.validationErrors.push('Too many Troops, add more regiments/hordes');
        }
        if (warengines < 0) {
            isValid = false;
            this.validationErrors.push('Too many War Engines, add more regiments/hordes');
        }
        // console.log("heroes :" + heroes);
        // console.log("monsters :" + monsters);
        // console.log("troops :" + troops);
        // console.log("shared :" + shared);
        // console.log("warengines :" + warengines);
        // console.log('isValid: ' + isValid);
        return isValid;
        // return true;
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
                '.list-total-points { text-align: right; align: right; }',
                '.validation-errors { background-color:#f00; color: #fff; padding-left: 5px; }'
            ],
            providers: [file_loader_service_1.FileLoaderService]
        }), 
        __metadata('design:paramtypes', [http_1.Http, file_loader_service_1.FileLoaderService])
    ], ArmyListComponent);
    return ArmyListComponent;
}());
exports.ArmyListComponent = ArmyListComponent;
//# sourceMappingURL=army-list.component.js.map
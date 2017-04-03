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
var UnitUpgradeEditorComponent = (function () {
    function UnitUpgradeEditorComponent() {
        this.upgradesChangedEvent = new core_1.EventEmitter();
        this.upgrades = [];
        this.oldUpgrades = [];
    }
    UnitUpgradeEditorComponent.prototype.ngOnInit = function () { };
    UnitUpgradeEditorComponent.prototype.ngDoCheck = function () {
        var _this = this;
        var hasChanged = false;
        if (this.upgrades != undefined && this.upgrades != null) {
            if (this.upgrades.length < this.oldUpgrades.length) {
                hasChanged = true;
                this.oldUpgrades.length = this.upgrades.length;
            }
            this.upgrades.forEach(function (u, i) {
                if (i >= _this.oldUpgrades.length) {
                    hasChanged = true;
                    _this.oldUpgrades.push(_this.getNewUpgrade());
                }
                if (_this.oldUpgrades[i].name !== u.name) {
                    hasChanged = true;
                    _this.oldUpgrades[i].name = u.name;
                }
                if (_this.oldUpgrades[i].pts !== u.pts) {
                    hasChanged = true;
                    _this.oldUpgrades[i].pts = u.pts;
                }
                if (_this.hasModifierArrayChanged(u.unitModifiers, _this.oldUpgrades[i].unitModifiers) == true) {
                    hasChanged = true;
                }
                if (_this.hasModifierArrayChanged(u.unitOptionModifiers, _this.oldUpgrades[i].unitOptionModifiers) == true) {
                    hasChanged = true;
                }
            });
        }
        if (hasChanged) {
            this.upgradesChanged();
        }
    };
    UnitUpgradeEditorComponent.prototype.hasModifierArrayChanged = function (arr, oldArr) {
        var _this = this;
        var hasChanged = false;
        if (arr != undefined && arr != null) {
            if (arr.length < oldArr.length) {
                hasChanged = true;
                oldArr.length = arr.length;
            }
            arr.forEach(function (a, i) {
                if (i >= oldArr.length) {
                    hasChanged = true;
                    oldArr.push(_this.getNewModifier());
                }
                if (oldArr[i].action !== a.action) {
                    hasChanged = true;
                    oldArr[i].action = a.action;
                }
                if (oldArr[i].element !== a.element) {
                    hasChanged = true;
                    oldArr[i].element = a.element;
                }
                if (oldArr[i].newValue !== a.newValue) {
                    hasChanged = true;
                    oldArr[i].newValue = a.newValue;
                }
            });
        }
        return hasChanged;
    };
    UnitUpgradeEditorComponent.prototype.upgradesChanged = function () {
        // console.log('emit upgrades-changed event');
        // console.log(this.upgrades);
        this.upgradesChangedEvent.emit();
    };
    UnitUpgradeEditorComponent.prototype.getNewUpgrade = function () {
        var r = new model_1.UnitUpgrade();
        r.name = "New Upgrade";
        r.pts = 0;
        r.unitModifiers = [];
        r.unitOptionModifiers = [];
        r.isSelected = false;
        return r;
    };
    UnitUpgradeEditorComponent.prototype.getNewModifier = function () {
        var r = new model_1.Modifier();
        r.action = "";
        r.element = "";
        r.newValue = "";
        return r;
    };
    UnitUpgradeEditorComponent.prototype.addUpgrade = function () {
        if (this.upgrades == undefined) {
            this.upgrades = [];
        }
        this.upgrades.push(this.getNewUpgrade());
    };
    UnitUpgradeEditorComponent.prototype.removeUpgrade = function (index) {
        if (index != undefined && index > -1) {
            this.upgrades.splice(index, 1);
        }
    };
    UnitUpgradeEditorComponent.prototype.addMod = function (arr) {
        arr.push(this.getNewModifier());
    };
    UnitUpgradeEditorComponent.prototype.removeMod = function (arr, index) {
        arr.splice(index, 1);
    };
    UnitUpgradeEditorComponent.prototype.setAction = function (mod) {
        switch (mod.element) {
            case 'name':
            case 'type':
            case 'sp':
            case 'me':
            case 'ra':
            case 'de':
            case 'at':
                mod.action = 'replace';
                break;
            case 'piercing':
            case 'cs':
            case 'tc':
                mod.action = 'add';
                break;
            case 'special':
                mod.action = 'add-array';
                break;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], UnitUpgradeEditorComponent.prototype, "upgrades", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UnitUpgradeEditorComponent.prototype, "upgradesChangedEvent", void 0);
    UnitUpgradeEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'unit-upgrade-editor',
            templateUrl: 'unit-upgrade-editor.component.html',
            styles: [
                '.bordered { border: solid 1px }',
                '.col-* '
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], UnitUpgradeEditorComponent);
    return UnitUpgradeEditorComponent;
}());
exports.UnitUpgradeEditorComponent = UnitUpgradeEditorComponent;
//# sourceMappingURL=unit-upgrade-editor.component.js.map
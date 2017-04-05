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
var ng2_completer_1 = require('ng2-completer');
var model_1 = require('../../model');
var file_loader_service_1 = require('../../services/file-loader.service');
var UnitEditorComponent = (function () {
    function UnitEditorComponent(completerService, fl) {
        this.completerService = completerService;
        this.fl = fl;
        this.specials = [];
        this.unitChangedEvent = new core_1.EventEmitter();
        this.unit = new model_1.Unit();
        this.oldUnit = new model_1.Unit();
        this.loadSpecials();
        this.dataService = completerService.local(this.specials, 'name', 'name');
    }
    UnitEditorComponent.prototype.ngDoCheck = function () {
        var hasChanged = false;
        if (this.unit.name !== this.oldUnit.name) {
            hasChanged = true;
            this.oldUnit.name = this.unit.name;
        }
        if (this.unit.unitType !== this.oldUnit.unitType) {
            hasChanged = true;
            this.oldUnit.unitType = this.unit.unitType;
        }
        if (this.unit.piercing !== this.oldUnit.piercing) {
            hasChanged = true;
            this.oldUnit.piercing = this.unit.piercing;
        }
        if (this.unit.cs !== this.oldUnit.cs) {
            hasChanged = true;
            this.oldUnit.cs = this.unit.cs;
        }
        if (this.unit.tc !== this.oldUnit.tc) {
            hasChanged = true;
            this.oldUnit.tc = this.unit.tc;
        }
        if (this.unit.special !== this.oldUnit.special) {
            hasChanged = true;
            this.oldUnit.special = this.unit.special;
        }
        // if (this.unit.unitOptions !== this.oldUnit.unitOptions) {
        //     hasChanged = true;
        //     this.oldUnit.unitOptions = this.unit.unitOptions;
        // }
        // if (this.unit.unitUpgrades !== this.oldUnit.unitUpgrades) {
        //     hasChanged = true;
        //     this.oldUnit.unitUpgrades = this.unit.unitUpgrades;
        // }
        if (hasChanged) {
            this.unitChanged();
        }
    };
    UnitEditorComponent.prototype.ngOnInit = function () { };
    UnitEditorComponent.prototype.findSpecial = function (name, callback) {
        this.unit.special.forEach(function (n, i) {
            if (name === n) {
                if (callback != undefined) {
                    callback(n, i);
                }
            }
        });
    };
    UnitEditorComponent.prototype.loadSpecials = function () {
        // this.fl.getFile('data/special-rules.json', (res) => {
        //     let json = res.json();
        var _this = this;
        //     for (var i = 0; i < json.length; i++) {
        //         var obj = json[i];
        //         let s = this.loadSpecial(obj);
        //         this.specials.push(s);
        //     }
        // });
        this.fl.getSpecialRules(function (res) {
            var json = res.json();
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                var s = _this.loadSpecial(obj);
                _this.specials.push(s);
            }
        });
    };
    UnitEditorComponent.prototype.loadSpecial = function (json) {
        var sr = new model_1.SpecialRule();
        sr.name = json['name'];
        sr.desc = json['desc'];
        return sr;
    };
    UnitEditorComponent.prototype.unitChanged = function () {
        // console.log('emit unit-changed event')
        // console.log(this.unit.unitUpgrades);
        this.unitChangedEvent.emit();
    };
    UnitEditorComponent.prototype.addSpecial = function (input) {
        if (this.unit.special == undefined) {
            this.unit.special = [];
        }
        this.unit.special.push(input.value);
        input.value = '';
        this.unitChanged();
    };
    UnitEditorComponent.prototype.removeSpecial = function (name) {
        var _this = this;
        this.findSpecial(name, function (n, i) {
            _this.unit.special.splice(i, 1);
            _this.unitChanged();
        });
    };
    UnitEditorComponent.prototype.changeToNum = function (property, val) {
        // console.log(property);
        // console.log(val);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', model_1.Unit)
    ], UnitEditorComponent.prototype, "unit", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UnitEditorComponent.prototype, "unitChangedEvent", void 0);
    UnitEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'unit-editor',
            templateUrl: 'unit-editor.component.html',
            styles: [
                '.bordered { border: 1px solid; margin-top: 5px; }',
                '.no-padding { padding: 0px; }',
            ],
            providers: [file_loader_service_1.FileLoaderService]
        }), 
        __metadata('design:paramtypes', [ng2_completer_1.CompleterService, file_loader_service_1.FileLoaderService])
    ], UnitEditorComponent);
    return UnitEditorComponent;
}());
exports.UnitEditorComponent = UnitEditorComponent;
//# sourceMappingURL=unit-editor.component.js.map
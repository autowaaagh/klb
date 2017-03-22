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
var UnitEditorComponent = (function () {
    function UnitEditorComponent() {
        this.unit = new model_1.Unit();
    }
    UnitEditorComponent.prototype.ngOnInit = function () { };
    UnitEditorComponent.prototype.setSelectedUnit = function (unit) {
        // this.unit = unit;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', model_1.Unit)
    ], UnitEditorComponent.prototype, "unit", void 0);
    UnitEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'unit-editor',
            templateUrl: 'unit-editor.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], UnitEditorComponent);
    return UnitEditorComponent;
}());
exports.UnitEditorComponent = UnitEditorComponent;
//# sourceMappingURL=unit-editor.component.js.map
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
var UnitOptionEditorComponent = (function () {
    function UnitOptionEditorComponent() {
        this.optionsChangedEvent = new core_1.EventEmitter();
        this.options = [];
        this.oldOptions = [];
    }
    UnitOptionEditorComponent.prototype.ngOnInit = function () { };
    UnitOptionEditorComponent.prototype.getNewOption = function () {
        return {
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
        };
    };
    UnitOptionEditorComponent.prototype.ngDoCheck = function () {
        var _this = this;
        var hasChanged = false;
        if (this.options != undefined && this.options != null) {
            if (this.options.length < this.oldOptions.length) {
                hasChanged = true;
                this.oldOptions.length = this.options.length;
            }
            this.options.forEach(function (o, i) {
                if (i >= _this.oldOptions.length) {
                    hasChanged = true;
                    _this.oldOptions.push(_this.getNewOption());
                }
                if (_this.oldOptions[i].unitSize !== o.unitSize) {
                    hasChanged = true;
                    _this.oldOptions[i].unitSize = o.unitSize;
                }
                if (_this.oldOptions[i].modelCount !== o.modelCount) {
                    hasChanged = true;
                    _this.oldOptions[i].modelCount = o.modelCount;
                }
                if (_this.oldOptions[i].sp !== o.sp) {
                    hasChanged = true;
                    _this.oldOptions[i].sp = o.sp;
                }
                if (_this.oldOptions[i].me !== o.me) {
                    hasChanged = true;
                    _this.oldOptions[i].me = o.me;
                }
                if (_this.oldOptions[i].ra !== o.ra) {
                    hasChanged = true;
                    _this.oldOptions[i].ra = o.ra;
                }
                if (_this.oldOptions[i].de !== o.de) {
                    hasChanged = true;
                    _this.oldOptions[i].de = o.de;
                }
                if (_this.oldOptions[i].at !== o.at) {
                    hasChanged = true;
                    _this.oldOptions[i].at = o.at;
                }
                if (_this.oldOptions[i].nv == undefined) {
                    _this.oldOptions[i].nv = new model_1.Nerve();
                }
                if (_this.oldOptions[i].nv.waver !== o.nv.waver) {
                    hasChanged = true;
                    _this.oldOptions[i].nv.waver = o.nv.waver;
                }
                if (_this.oldOptions[i].nv.route !== o.nv.route) {
                    hasChanged = true;
                    _this.oldOptions[i].nv.route = o.nv.route;
                }
                if (_this.oldOptions[i].pts !== o.pts) {
                    hasChanged = true;
                    _this.oldOptions[i].pts = o.pts;
                }
            });
        }
        if (hasChanged) {
            this.optionsChanged();
        }
    };
    UnitOptionEditorComponent.prototype.optionsChanged = function () {
        console.log('emit options-changed event');
        this.optionsChangedEvent.emit();
    };
    UnitOptionEditorComponent.prototype.addUnitOption = function () {
        if (this.options == undefined) {
            this.options = [];
        }
        this.options.push(this.getNewOption());
    };
    UnitOptionEditorComponent.prototype.removeUnitOption = function (index) {
        if (index != undefined && index > -1) {
            this.options.splice(index, 1);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], UnitOptionEditorComponent.prototype, "options", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], UnitOptionEditorComponent.prototype, "optionsChangedEvent", void 0);
    UnitOptionEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'unit-option-editor',
            templateUrl: 'unit-option-editor.component.html'
        }), 
        __metadata('design:paramtypes', [])
    ], UnitOptionEditorComponent);
    return UnitOptionEditorComponent;
}());
exports.UnitOptionEditorComponent = UnitOptionEditorComponent;
//# sourceMappingURL=unit-option-editor.component.js.map
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
var file_loader_service_1 = require('../../services/file-loader.service');
var SpecialRulesEditorComponent = (function () {
    function SpecialRulesEditorComponent(fl) {
        this.fl = fl;
        this.specials = [];
        this.loadSpecials();
    }
    SpecialRulesEditorComponent.prototype.ngOnInit = function () { };
    SpecialRulesEditorComponent.prototype.loadSpecials = function () {
        var _this = this;
        this.fl.getSpecialRules(function (res) {
            var json = res.json();
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                var s = _this.loadSpecial(obj);
                _this.specials.push(s);
            }
        });
    };
    SpecialRulesEditorComponent.prototype.loadSpecial = function (json) {
        var sr = new model_1.SpecialRule();
        sr.name = json['name'];
        sr.desc = json['desc'];
        sr.id = json['_id'];
        return sr;
    };
    SpecialRulesEditorComponent.prototype.update = function (index) {
        var s = this.specials[index];
        this.fl.updateSpecialRule(s.id, s);
    };
    SpecialRulesEditorComponent.prototype.createNew = function () {
        var _this = this;
        var sr = new model_1.SpecialRule();
        sr.name = "New Special Rule";
        sr.desc = "";
        this.fl.createNewSpecialRule(sr, function (res) {
            var data = res.json();
            sr.id = data._id;
            _this.specials.push(sr);
        });
    };
    SpecialRulesEditorComponent.prototype.removeSpecial = function (index) {
        var sr = this.specials[index];
        this.fl.removeSpecialRule(sr.id);
        this.specials.splice(index, 1);
    };
    SpecialRulesEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'special-rules-editor',
            templateUrl: 'special-rules-editor.component.html',
            styles: [],
            providers: [file_loader_service_1.FileLoaderService]
        }), 
        __metadata('design:paramtypes', [file_loader_service_1.FileLoaderService])
    ], SpecialRulesEditorComponent);
    return SpecialRulesEditorComponent;
}());
exports.SpecialRulesEditorComponent = SpecialRulesEditorComponent;
//# sourceMappingURL=special-rules-editor.component.js.map
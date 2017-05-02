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
var model_1 = require("../../model");
var file_loader_service_1 = require("../../services/file-loader.service");
var CyphersViewComponent = (function () {
    function CyphersViewComponent(fl) {
        this.fl = fl;
        this.cyphers = [];
        this.letters = Array.from({ length: 26 }, function (_, i) { return String.fromCharCode('A'.charCodeAt(0) + i); });
        this.selectedCypher = new model_1.Cypher();
        this.loadCyphers();
    }
    CyphersViewComponent.prototype.ngOnInit = function () { };
    CyphersViewComponent.prototype.loadCyphers = function () {
        var _this = this;
        this.fl.getCyphers(function (res) {
            var json = res.json();
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                var c = _this.loadCypher(obj);
                _this.cyphers.push(c);
            }
        });
    };
    CyphersViewComponent.prototype.loadCypher = function (json) {
        var c = new model_1.Cypher();
        c.name = json['name'];
        c.desc = json['desc'];
        c.level = json['level'];
        c.id = json['_id'];
        c.source = json['source'];
        return c;
    };
    CyphersViewComponent.prototype.test = function () {
        window.open("cypher");
    };
    CyphersViewComponent.prototype.select = function (index) {
        if (name !== undefined && name > -1) {
            this.selectedCypher = this.cyphers[index];
        }
    };
    CyphersViewComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cyphers-view',
            templateUrl: 'cyphers-view.component.html',
            providers: [file_loader_service_1.FileLoaderService],
            styleUrls: ['cyphers-view.component.css']
        }), 
        __metadata('design:paramtypes', [file_loader_service_1.FileLoaderService])
    ], CyphersViewComponent);
    return CyphersViewComponent;
}());
exports.CyphersViewComponent = CyphersViewComponent;
//# sourceMappingURL=cyphers-view.component.js.map
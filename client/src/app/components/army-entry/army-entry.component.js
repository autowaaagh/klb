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
var ArmyEntryComponent = (function () {
    function ArmyEntryComponent(http) {
        var _this = this;
        this.http = http;
        this.armies = [];
        this.http.get('data/armies.json')
            .subscribe(function (res) {
            var json = res.json();
            console.log(json);
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                _this.loadData(obj);
            }
        });
    }
    ArmyEntryComponent.prototype.ngOnInit = function () { };
    ArmyEntryComponent.prototype.loadData = function (json) {
        console.log(json);
        var dl = new model_1.DataLoader();
        dl.name = json['name'];
        dl.loc = json['loc'];
        this.armies.push(dl);
    };
    ArmyEntryComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'army-entry',
            templateUrl: 'army-entry.component.html',
            styles: [
                "#armylist li:hover { font-weight: bold; font-size: 14; }",
            ]
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ArmyEntryComponent);
    return ArmyEntryComponent;
}());
exports.ArmyEntryComponent = ArmyEntryComponent;
//# sourceMappingURL=army-entry.component.js.map
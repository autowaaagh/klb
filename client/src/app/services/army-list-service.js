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
var ArmyListService = (function () {
    function ArmyListService(http) {
        this.http = http;
    }
    ArmyListService.prototype.getArmies = function (callback) {
        this.http.get('api/army/')
            .subscribe(function (res) {
            if (callback != undefined) {
                callback(res);
            }
        });
    };
    ArmyListService.prototype.getArmy = function (id, callback) {
        this.http.get('api/army/' + id)
            .subscribe(function (res) {
            if (callback != undefined) {
                callback(res);
            }
        });
    };
    ArmyListService.prototype.writeNewArmy = function (data, callback) {
        this.http.post('api/army/', data)
            .subscribe(function (res) {
            if (callback != undefined) {
                callback(res);
            }
        });
    };
    ArmyListService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ArmyListService);
    return ArmyListService;
}());
exports.ArmyListService = ArmyListService;
//# sourceMappingURL=army-list-service.js.map
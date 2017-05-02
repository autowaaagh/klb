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
var FileLoaderService = (function () {
    function FileLoaderService(http) {
        this.http = http;
    }
    FileLoaderService.prototype.readAll = function (url, callback) {
        this.http.get('api/' + url + '/')
            .subscribe(function (res) {
            if (callback != undefined) {
                callback(res);
            }
        });
    };
    FileLoaderService.prototype.readSingle = function (url, id, callback) {
        this.http.get('api/' + url + '/' + id)
            .subscribe(function (res) {
            if (callback != undefined) {
                callback(res);
            }
        });
    };
    FileLoaderService.prototype.create = function (url, data, callback) {
        this.http.post('api/' + url + '/', data)
            .subscribe(function (res) {
            if (callback != undefined) {
                callback(res);
            }
        });
    };
    FileLoaderService.prototype.update = function (url, id, data, callback) {
        this.http.put('api/' + url + '/' + id, data)
            .subscribe(function (res) {
            if (callback != undefined) {
                callback(res);
            }
        });
    };
    FileLoaderService.prototype.remove = function (url, id, callback) {
        this.http.delete('api/' + url + '/' + id)
            .subscribe(function (res) {
            if (callback != undefined) {
                callback(res);
            }
        });
    };
    //==================== ARMIES ====================//
    FileLoaderService.prototype.getArmies = function (callback) {
        this.readAll('army', callback);
    };
    FileLoaderService.prototype.getArmy = function (id, callback) {
        this.readSingle('army', id, callback);
    };
    FileLoaderService.prototype.createNewArmy = function (data, callback) {
        this.create('army', data, callback);
    };
    FileLoaderService.prototype.updateArmy = function (id, data, callback) {
        this.update('army', id, data, callback);
    };
    FileLoaderService.prototype.removeArmy = function (id, callback) {
        this.remove('army', id, callback);
    };
    //==================== ARTEFACTS ====================//
    FileLoaderService.prototype.getArtefacts = function (callback) {
        this.readAll('artefact', callback);
    };
    FileLoaderService.prototype.getArtefact = function (id, callback) {
        this.readSingle('artefact', id, callback);
    };
    FileLoaderService.prototype.createNewArtefact = function (data, callback) {
        this.create('artefact', data, callback);
    };
    FileLoaderService.prototype.updateArtefact = function (id, data, callback) {
        this.update('artefact', id, data, callback);
    };
    FileLoaderService.prototype.removeArtefact = function (id, callback) {
        this.remove('artefact', id, callback);
    };
    //==================== SPECIAL RULES ====================//
    FileLoaderService.prototype.getSpecialRules = function (callback) {
        this.readAll('specialrule', callback);
    };
    FileLoaderService.prototype.getSpecialRule = function (id, callback) {
        this.readSingle('specialrule', id, callback);
    };
    FileLoaderService.prototype.createNewSpecialRule = function (data, callback) {
        this.create('specialrule', data, callback);
    };
    FileLoaderService.prototype.updateSpecialRule = function (id, data, callback) {
        this.update('specialrule', id, data, callback);
    };
    FileLoaderService.prototype.removeSpecialRule = function (id, callback) {
        this.remove('specialrule', id, callback);
    };
    //==================== SPECIAL RULES ====================//
    FileLoaderService.prototype.getScenarios = function (callback) {
        this.readAll('scenario', callback);
    };
    FileLoaderService.prototype.getScenario = function (id, callback) {
        this.readSingle('scenario', id, callback);
    };
    FileLoaderService.prototype.createNewScenario = function (data, callback) {
        this.create('scenario', data, callback);
    };
    FileLoaderService.prototype.updateScenario = function (id, data, callback) {
        this.update('scenario', id, data, callback);
    };
    FileLoaderService.prototype.removeScenario = function (id, callback) {
        this.remove('scenario', id, callback);
    };
    //==================== CYPHER RULES ====================//
    FileLoaderService.prototype.getCyphers = function (callback) {
        this.readAll('cypher', callback);
    };
    FileLoaderService.prototype.getCypher = function (id, callback) {
        this.readSingle('cypher', id, callback);
    };
    FileLoaderService.prototype.createNewCypher = function (data, callback) {
        this.create('cypher', data, callback);
    };
    FileLoaderService.prototype.updateCypher = function (id, data, callback) {
        this.update('cypher', id, data, callback);
    };
    FileLoaderService.prototype.removeCypher = function (id, callback) {
        this.remove('cypher', id, callback);
    };
    FileLoaderService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], FileLoaderService);
    return FileLoaderService;
}());
exports.FileLoaderService = FileLoaderService;
//# sourceMappingURL=file-loader.service.js.map
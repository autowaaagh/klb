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
var ScenarioListComponent = (function () {
    function ScenarioListComponent(fl) {
        this.fl = fl;
        this.scenarios = [];
        this.loadScenarios();
    }
    ScenarioListComponent.prototype.ngOnInit = function () { };
    ScenarioListComponent.prototype.loadScenarios = function () {
        var _this = this;
        this.fl.getScenarios((function (res) {
            var json = res.json();
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                var s = _this.loadScenario(obj);
                _this.scenarios.push(s);
            }
        }));
    };
    ScenarioListComponent.prototype.loadScenario = function (json) {
        var s = new model_1.Scenario();
        s.name = json['name'];
        s.diceResult = json['diceResult'];
        s.description = json['description'];
        s.id = json['_id'];
        return s;
    };
    ScenarioListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'scenario-list',
            templateUrl: 'scenario-list.component.html',
            styles: [
                "pre {\n            white-space: pre-wrap;       /* css-3 */\n            white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */\n            white-space: -pre-wrap;      /* Opera 4-6 */\n            white-space: -o-pre-wrap;    /* Opera 7 */\n            word-wrap: break-word;       /* Internet Explorer 5.5+ */\n        }"
            ],
            providers: [file_loader_service_1.FileLoaderService]
        }), 
        __metadata('design:paramtypes', [file_loader_service_1.FileLoaderService])
    ], ScenarioListComponent);
    return ScenarioListComponent;
}());
exports.ScenarioListComponent = ScenarioListComponent;
//# sourceMappingURL=scenario-list.component.js.map
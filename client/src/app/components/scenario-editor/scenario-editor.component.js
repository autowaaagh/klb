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
var ScenarioEditorComponent = (function () {
    function ScenarioEditorComponent(fl) {
        this.fl = fl;
        this.scenarios = [];
        this.loadScenarios();
    }
    ScenarioEditorComponent.prototype.ngOnInit = function () { };
    ScenarioEditorComponent.prototype.findScenario = function (name, callback) {
        this.scenarios.forEach(function (n, i) {
            if (n.name === name) {
                if (callback != undefined) {
                    callback(n, i);
                }
            }
        });
    };
    ScenarioEditorComponent.prototype.loadScenarios = function () {
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
    ScenarioEditorComponent.prototype.loadScenario = function (json) {
        var s = new model_1.Scenario();
        s.name = json['name'];
        s.diceResult = json['diceResult'];
        s.description = json['description'];
        s.id = json['_id'];
        return s;
    };
    ScenarioEditorComponent.prototype.update = function (index) {
        var s = this.scenarios[index];
        this.fl.updateScenario(s.id, s);
    };
    ScenarioEditorComponent.prototype.add = function () {
        var _this = this;
        var s = new model_1.Scenario();
        s.name = "New Scenario";
        s.diceResult = 0;
        s.description = '';
        this.fl.createNewScenario(s, function (res) {
            var data = res.json();
            s.id = data._id;
            _this.scenarios.push(s);
        });
    };
    ScenarioEditorComponent.prototype.remove = function (index) {
        var s = this.scenarios[index];
        this.fl.removeScenario(s.id);
        this.scenarios.splice(index, 1);
    };
    ScenarioEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'scenario-editor',
            templateUrl: 'scenario-editor.component.html',
            styles: [
                'textarea { margin-bottom: 10px; }'
            ],
            providers: [file_loader_service_1.FileLoaderService]
        }), 
        __metadata('design:paramtypes', [file_loader_service_1.FileLoaderService])
    ], ScenarioEditorComponent);
    return ScenarioEditorComponent;
}());
exports.ScenarioEditorComponent = ScenarioEditorComponent;
//# sourceMappingURL=scenario-editor.component.js.map
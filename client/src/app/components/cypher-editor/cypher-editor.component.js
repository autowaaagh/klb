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
var CypherEditorComponent = (function () {
    function CypherEditorComponent(fl) {
        this.fl = fl;
        this.cyphers = [];
        this.loadCyphers();
    }
    CypherEditorComponent.prototype.ngOnInit = function () { };
    CypherEditorComponent.prototype.loadCyphers = function () {
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
    CypherEditorComponent.prototype.loadCypher = function (json) {
        var c = new model_1.Cypher();
        c.name = json['name'];
        c.desc = json['desc'];
        c.level = json['level'];
        c.id = json['_id'];
        return c;
    };
    CypherEditorComponent.prototype.update = function (index) {
        var c = this.cyphers[index];
        this.fl.updateCypher(c.id, c);
    };
    CypherEditorComponent.prototype.createCypher = function () {
        var _this = this;
        var c = new model_1.Cypher();
        c.name = "New Cypher";
        c.level = '';
        c.desc = '';
        c.source = '';
        this.fl.createNewCypher(c, function (res) {
            var data = res.json();
            c.id = data._id;
            _this.cyphers.push(c);
        });
    };
    CypherEditorComponent.prototype.remove = function (index) {
        var c = this.cyphers[index];
        this.fl.removeCypher(c.id);
        this.cyphers.splice(index, 1);
    };
    CypherEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'cypher-editor',
            templateUrl: 'cypher-editor.component.html',
            providers: [file_loader_service_1.FileLoaderService]
        }), 
        __metadata('design:paramtypes', [file_loader_service_1.FileLoaderService])
    ], CypherEditorComponent);
    return CypherEditorComponent;
}());
exports.CypherEditorComponent = CypherEditorComponent;
//# sourceMappingURL=cypher-editor.component.js.map
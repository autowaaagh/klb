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
var ArtefactEditorComponent = (function () {
    function ArtefactEditorComponent(fl) {
        this.fl = fl;
        this.artefacts = [];
        this.loadArtefacts();
    }
    ArtefactEditorComponent.prototype.ngOnInit = function () { };
    ArtefactEditorComponent.prototype.loadArtefacts = function () {
        var _this = this;
        this.fl.getArtefacts(function (res) {
            var json = res.json();
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                var a = _this.loadArtefact(obj);
                _this.artefacts.push(a);
            }
        });
    };
    ArtefactEditorComponent.prototype.loadArtefact = function (json) {
        var a = new model_1.Artefact();
        a.name = json['name'];
        a.description = json['description'];
        a.pts = json['pts'];
        a.validTypes = json['validTypes'];
        a.id = json['_id'];
        return a;
    };
    ArtefactEditorComponent.prototype.update = function (index) {
        var a = this.artefacts[index];
        this.fl.updateArtefact(a.id, a);
    };
    ArtefactEditorComponent.prototype.createArtefact = function () {
        var _this = this;
        var a = new model_1.Artefact();
        a.name = "New Artefact";
        a.pts = 0;
        a.description = "";
        a.validTypes = [];
        this.fl.createNewArtefact(a, function (res) {
            var data = res.json();
            a.id = data._id;
            _this.artefacts.push(a);
        });
    };
    ArtefactEditorComponent.prototype.remove = function (index) {
        var a = this.artefacts[index];
        this.fl.removeArtefact(a.id);
        this.artefacts.splice(index, 1);
    };
    ArtefactEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'artefact-editor',
            templateUrl: 'artefact-editor.component.html',
            styles: [],
            providers: [file_loader_service_1.FileLoaderService]
        }), 
        __metadata('design:paramtypes', [file_loader_service_1.FileLoaderService])
    ], ArtefactEditorComponent);
    return ArtefactEditorComponent;
}());
exports.ArtefactEditorComponent = ArtefactEditorComponent;
//# sourceMappingURL=artefact-editor.component.js.map
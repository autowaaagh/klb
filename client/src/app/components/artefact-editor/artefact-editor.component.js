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
var file_loader_service_1 = require('../../services/file-loader.service');
var ArtefactEditorComponent = (function () {
    function ArtefactEditorComponent(fl) {
        this.fl = fl;
    }
    ArtefactEditorComponent.prototype.ngOnInit = function () { };
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
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
var ArmiesEditorComponent = (function () {
    function ArmiesEditorComponent(fl) {
        var _this = this;
        this.fl = fl;
        this.armies = [];
        this.selectedArmy = new model_1.ArmyList();
        this.armyChangeEvent = new core_1.EventEmitter();
        fl.getFile('data/armies.json', function (res) {
            var json = res.json();
            for (var i = 0; i < json.length; i++) {
                var obj = json[i];
                _this.loadData(obj);
                _this.onArmyChange(_this.armies[0].name);
            }
        });
    }
    ArmiesEditorComponent.prototype.ngOnInit = function () { };
    ArmiesEditorComponent.prototype.findArmy = function (name, callback) {
        this.armies.forEach(function (n, i) {
            if (n.name === name) {
                if (callback != undefined) {
                    callback(n, i);
                }
            }
        });
    };
    ArmiesEditorComponent.prototype.writeArmiesFile = function () {
        this.fl.writeFile('armies.json', this.armies);
    };
    ArmiesEditorComponent.prototype.loadData = function (json) {
        var dl = new model_1.DataLoader();
        dl.name = json['name'];
        dl.file = json['file'];
        this.armies.push(dl);
    };
    ArmiesEditorComponent.prototype.onArmyChange = function (name) {
        var _this = this;
        this.findArmy(name, function (n, i) {
            _this.armyChangeEvent.emit(n);
        });
    };
    ArmiesEditorComponent.prototype.addArmy = function (input) {
        var dl = new model_1.DataLoader();
        dl.name = input.value;
        dl.file = 'army-' + dl.name.replace(' ', '-').toLocaleLowerCase() + '.json';
        if (dl.name !== '' && dl.name != undefined) {
            if (this.armies == undefined) {
                this.armies = [];
            }
            this.armies.push(dl);
            var a = new model_1.ArmyList();
            a.name = dl.name;
            a.points = 0;
            this.fl.writeFile(dl.file, a);
            this.writeArmiesFile();
            ;
            input.value = '';
            input.focus();
        }
    };
    ArmiesEditorComponent.prototype.removeArmy = function (name) {
        var _this = this;
        this.findArmy(name, function (n, i) {
            _this.armies.splice(i, 1);
            _this.writeArmiesFile();
            _this.fl.deleteFile(n.file);
        });
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], ArmiesEditorComponent.prototype, "armyChangeEvent", void 0);
    ArmiesEditorComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'armies-editor',
            templateUrl: 'armies-editor.component.html',
            providers: [file_loader_service_1.FileLoaderService]
        }), 
        __metadata('design:paramtypes', [file_loader_service_1.FileLoaderService])
    ], ArmiesEditorComponent);
    return ArmiesEditorComponent;
}());
exports.ArmiesEditorComponent = ArmiesEditorComponent;
//# sourceMappingURL=armies-editor.component.js.map
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
var AppComponent = (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        core_1.Component({
            selector: 'my-app',
            template: "\n\n    <ul class=\"nav nav-tabs\">\n      <li class=\"active\"><a data-toggle=\"tab\" href=\"#list-builder\">List Builder</a></li>\n      <li><a data-toggle=\"tab\" href=\"#army-entry\">Army Entry</a></li>\n    </ul>\n\n    <div class=\"tab-content\">\n      <div id=\"list-builder\" class=\"tab-pane fade in active\">      \n        <h3>List Builder</h3>\n        <div class=\"container-fluid\">\n          <div class=\"col-6\"><army-selector (addUnitEvent)=\"armylist.addUnitToList($event)\"></army-selector></div>\n          <div class=\"col-6\"><army-list #armylist (printListEvent)=\"listprinter.outputList($event)\"></army-list></div>\n          <list-printer #listprinter></list-printer>\n        </div>\n      </div>\n      <div id=\"army-entry\" class=\"tab-pane fade\">      \n        <h3>Army Entry</h3>\n        <div><army-entry></army-entry></div>\n      </div>\n    </div>\n     \n\n  ",
            styles: [
                '.container { cursor: default; }'
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map
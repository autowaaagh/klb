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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var army_selector_component_1 = require('./components/army-selector/army-selector.component');
var army_list_component_1 = require('./components/army-list/army-list.component');
var list_printer_component_1 = require('./components/list-printer/list-printer.component');
var army_entry_component_1 = require('./components/army-entry/army-entry.component');
var unit_editor_component_1 = require('./components/unit-editor/unit-editor.component');
var army_editor_component_1 = require('./components/army-editor/army-editor.component');
var armies_editor_component_1 = require('./components/armies-editor/armies-editor.component');
var unit_option_editor_component_1 = require('./components/unit-option-editor/unit-option-editor.component');
var unit_upgrade_editor_component_1 = require('./components/unit-upgrade-editor/unit-upgrade-editor.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule
            ],
            declarations: [
                app_component_1.AppComponent,
                army_selector_component_1.ArmySelectorComponent,
                army_list_component_1.ArmyListComponent,
                list_printer_component_1.ListPrinterComponent,
                army_entry_component_1.ArmyEntryComponent,
                unit_editor_component_1.UnitEditorComponent,
                army_editor_component_1.ArmyEditorComponent,
                armies_editor_component_1.ArmiesEditorComponent,
                unit_option_editor_component_1.UnitOptionEditorComponent,
                unit_upgrade_editor_component_1.UnitUpgradeEditorComponent
            ],
            bootstrap: [
                app_component_1.AppComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map
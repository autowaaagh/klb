import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { Ng2CompleterModule } from 'ng2-completer';

import { AppComponent } from './app.component';
import { ArmySelectorComponent } from './components/army-selector/army-selector.component';
import { ArmyListComponent } from './components/army-list/army-list.component';
import { ListPrinterComponent } from './components/list-printer/list-printer.component';
import { ArmyEntryComponent } from './components/army-entry/army-entry.component';
import { UnitEditorComponent } from './components/unit-editor/unit-editor.component';
import { ArmyEditorComponent } from './components/army-editor/army-editor.component';
import { ArmiesEditorComponent } from './components/armies-editor/armies-editor.component';
import { UnitOptionEditorComponent } from './components/unit-option-editor/unit-option-editor.component';
import { UnitUpgradeEditorComponent } from './components/unit-upgrade-editor/unit-upgrade-editor.component';
import { SpecialRulesEditorComponent } from './components/special-rules-editor/special-rules-editor.component';
import { ArtefactEditorComponent } from './components/artefact-editor/artefact-editor.component';
import { ScenarioListComponent } from './components/scenario-list/scenario-list.component';
import { ScenarioEditorComponent } from './components/scenario-editor/scenario-editor.component';


@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    Ng2CompleterModule
  ],
  declarations: [
    AppComponent,
    ArmySelectorComponent,
    ArmyListComponent,
    ListPrinterComponent,
    ArmyEntryComponent,
    UnitEditorComponent,
    ArmyEditorComponent,
    ArmiesEditorComponent,
    UnitOptionEditorComponent,
    UnitUpgradeEditorComponent,
    SpecialRulesEditorComponent,
    ArtefactEditorComponent,
    ScenarioEditorComponent,
    ScenarioListComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

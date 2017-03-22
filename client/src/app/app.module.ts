import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ArmySelectorComponent } from './components/army-selector/army-selector.component';
import { ArmyListComponent } from './components/army-list/army-list.component';
import { ListPrinterComponent } from './components/list-printer/list-printer.component';
import { ArmyEntryComponent } from './components/army-entry/army-entry.component';
import { UnitEditorComponent } from './components/unit-editor/unit-editor.component';
import { ArmyEditorComponent } from './components/army-editor/army-editor.component';
import { ArmiesEditorComponent } from './components/armies-editor/armies-editor.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ArmySelectorComponent,
    ArmyListComponent,
    ListPrinterComponent,
    ArmyEntryComponent,
    UnitEditorComponent,
    ArmyEditorComponent,
    ArmiesEditorComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }

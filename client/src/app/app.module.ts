import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ArmySelectorComponent } from './components/army-selector/army-selector.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    ArmySelectorComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

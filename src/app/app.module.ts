import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PopupModule } from './popup/popup.module';
import { MatIconModule } from '@angular/material';
import { LanesAffectationEditorModule } from './affected-lanes-selector/lanes-affectation-editor.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    PopupModule,
    LanesAffectationEditorModule,
    MatIconModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { LanesAffectationEditorComponent } from './lanes-affectation-editor.component';
import { CommonModule } from '@angular/common';
import { LaneAffectationPopupComponent } from './lane-affectation-popup/lane-affectation-popup.component';
import { LaneAffectationButtonComponent } from './lane-affectation-button/lane-affectation-button.component';
import { PopupModule } from '../popup/popup.module';

@NgModule({
    imports: [
        MatButtonModule,
        MatIconModule,
        CommonModule,
        PopupModule
    ],
  declarations: [LaneAffectationPopupComponent, LaneAffectationButtonComponent, LanesAffectationEditorComponent],
  entryComponents: [LaneAffectationPopupComponent],
  exports: [LaneAffectationPopupComponent, LaneAffectationButtonComponent, LanesAffectationEditorComponent]
})
export class LanesAffectationEditorModule { }

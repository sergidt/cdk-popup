import { NgModule } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';
import { PopupComponent } from './popup.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    OverlayModule,
    BrowserModule
  ],
  declarations: [PopupComponent],
  entryComponents: [PopupComponent],
  exports: [PopupComponent]
})
export class PopupModule { }

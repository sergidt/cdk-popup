import { Injectable, Injector } from '@angular/core';
import { Overlay, ConnectionPositionPair, PositionStrategy, OverlayConfig } from '@angular/cdk/overlay';
import { PortalInjector, ComponentPortal } from '@angular/cdk/portal';
import { PopupRef, PopupContent } from './popup.definitions';
import { PopupComponent } from './popup.component';

export interface PopupParams<T> {
  origin: HTMLElement;
  content: PopupContent;
  width?: string | number;
  height?: string | number;
  data?: T;
}

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  constructor(private overlay: Overlay, private injector: Injector) { }

  open<T>({ origin, content, data, width, height }: PopupParams<T>): PopupRef<T> {
    const overlayRef = this.overlay.create(this.getOverlayConfig({ origin, width, height }));
    const popoverRef = new PopupRef<T>(overlayRef, content, data);
    const injector = this.createInjector(popoverRef, this.injector);

    overlayRef.attach(new ComponentPortal(PopupComponent, null, injector));

    return popoverRef;
  }

  private getOverlayConfig({ origin, width, height, backdropClass = '' }): OverlayConfig {
    return new OverlayConfig({
      hasBackdrop: true,
      backdropClass,
      width,
      height,
      positionStrategy: this.getOverlayPosition(origin),
      scrollStrategy: this.overlay.scrollStrategies.reposition()
    });
  }

  private getOverlayPosition(origin: HTMLElement): PositionStrategy {
   return this.overlay.position()
      .flexibleConnectedTo(origin)
      .withPositions(this.getPositions())
      .withFlexibleDimensions(false)
      .withPush(false);
  }

  createInjector(popupRef: PopupRef, injector: Injector) {
    const tokens = new WeakMap([[PopupRef, popupRef]]);
    return new PortalInjector(injector, tokens);
  }

  private getPositions(): ConnectionPositionPair[] {
    return [
      {
        originX: 'center',
        originY: 'top',
        overlayX: 'center',
        overlayY: 'bottom'
      },
      {
        originX: 'center',
        originY: 'bottom',
        overlayX: 'center',
        overlayY: 'top',
      },
    ];
  }
}

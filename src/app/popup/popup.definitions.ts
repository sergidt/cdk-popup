import { OverlayRef } from '@angular/cdk/overlay';
import { Subject } from 'rxjs';
import { TemplateRef, Type } from '@angular/core';

/**
 * Any Popup can host either TemplateRef or Component or a string
 */
export type PopupContent = TemplateRef<any> | Type<any> | string;

/**
 * How a Popup is rendering its content
 */
export enum PopupContentRenderMethod {
  Template = 'template',
  Component = 'component',
  Text = 'text'
}

/**
 * Available close events
 */
export enum PopupCloseEventType {
  BackdropClick = 'backdropClick',
  Close = 'close'
}

export interface PopupCloseEvent<T = any> {
  type: PopupCloseEventType;
  data: T;
}

export interface LaneAffectationTypeDTO {
  id: string;
  color: string;
  priority: number;
  icon: string;
}

export interface LaneAffectationDTO {
  laneNumber: number;
  laneAffectationTypeId?: string;
}

export enum LaneAffectationAction {
  Add,
  Delete,
  Update
}

export interface LaneAffectationEvent {
  laneAffectation: LaneAffectationDTO;
  action: LaneAffectationAction;
}

export interface AffectationPopupData {
  laneAffectationTypes: Array<LaneAffectationTypeDTO>;
  showDeleteButton: boolean;
}
/**
 * Represents the Popup wrapper. Can be referenced by any child in order to execute the proper logic.
 */
export class PopupRef<T = any> {
  private afterClosed = new Subject<PopupCloseEvent<T>>();
  afterClosed$ = this.afterClosed.asObservable();

  constructor(public overlay: OverlayRef, public content: PopupContent, public data: T) {
    overlay.backdropClick().subscribe(() => this.dispose(PopupCloseEventType.BackdropClick, null));
  }

  close(data?: T) {
    this.dispose(PopupCloseEventType.Close, data);
  }

  private dispose(type: PopupCloseEventType, data?: T) {
    this.overlay.dispose();
    this.afterClosed.next({ type, data });
    this.afterClosed.complete();
  }
}

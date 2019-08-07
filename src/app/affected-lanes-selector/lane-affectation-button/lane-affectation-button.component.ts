import {
    Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, OnChanges, SimpleChanges, SimpleChange, Output, EventEmitter
} from '@angular/core';
import { PopupService } from '../../popup/popup.service';
import { LaneAffectationPopupComponent } from '../lane-affectation-popup/lane-affectation-popup.component';
import {
    LaneAffectationTypeDTO, PopupCloseEventType, PopupCloseEvent, LaneAffectationDTO, LaneAffectationEvent, LaneAffectationAction,
    AffectationPopupData
} from '../../popup/popup.definitions';

@Component({
    selector: 'lane-affectation',
    template: `
      <div class="affectation--trigger" #origin>
        <button mat-button class="affectation-button" (click)="show(origin)">
          <mat-icon [ngStyle]="{'color': laneAffectationType?.color}"
                    [ngClass]="laneAffectationType?.icon">{{laneAffectationType?.icon || 'add'}}</mat-icon>
        </button>
      </div>`,
    styleUrls: ['../lane-affectation-style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LaneAffectationButtonComponent {
    @Output() laneAffectationChanged: EventEmitter<LaneAffectationEvent> = new EventEmitter<LaneAffectationEvent>();

    @Input()
    set availableLaneAffectationTypes(types: Array<LaneAffectationTypeDTO>) {
        this._availableLaneAffectationTypes = types;
    }

    get availableLaneAffectationTypes(): Array<LaneAffectationTypeDTO> {
        return this._availableLaneAffectationTypes;
    }

    @Input()
    set laneAffectation(affectation: LaneAffectationDTO) {
        this._laneAffectation = affectation;
        this.updateLaneAffectationType(this._availableLaneAffectationTypes, this._laneAffectation);
    }

    get laneAffectation(): LaneAffectationDTO {
        return this._laneAffectation;
    }

    laneAffectationType: LaneAffectationTypeDTO;

    name;

    private _availableLaneAffectationTypes: Array<LaneAffectationTypeDTO>;
    private _laneAffectation: LaneAffectationDTO;

    constructor(private service: PopupService, private cd: ChangeDetectorRef) {
        this.name = new Date().getTime().toString().substr(-3);
        console.log('New LaneAffectationButtonComponent -> ' +  this.name);
    }

    updateLaneAffectationType(types: Array<LaneAffectationTypeDTO>, laneAffectation: LaneAffectationDTO) {
        console.log(`${this.name}: lane ${laneAffectation.laneNumber}   affectation: ${laneAffectation.laneAffectationTypeId}`);

        if (!!laneAffectation && !!types) {
            console.log(`${this.name}: has changed`);
            console.log(`${this.name}: laneAffectationTypeId ${laneAffectation.laneAffectationTypeId}`);
            this.laneAffectationType = types.find(_ => _.id === laneAffectation.laneAffectationTypeId);
        } else {
            this.laneAffectationType = null;
        }

    }

    show(origin: HTMLElement) {
        const ref = this.service.open<AffectationPopupData>({
            content: LaneAffectationPopupComponent,
            origin,
            data: {
                laneAffectationTypes: this.availableLaneAffectationTypes,
                showDeleteButton: this._laneAffectation.laneNumber !== -1
            }
        });

        ref.afterClosed$.subscribe((event: PopupCloseEvent) => {
            if (event.type === PopupCloseEventType.Close) {
                const laneAffectation: LaneAffectationDTO = {
                    laneNumber: this.laneAffectation.laneNumber,
                    ...(event.data && { laneAffectationTypeId: event.data.id })
                };

                this.laneAffectationChanged.emit({
                    laneAffectation,
                    action: this.getLaneAffectationAction(laneAffectation)
                });
                this.cd.markForCheck();
            }
        });
    }

    private getLaneAffectationAction(laneAffectation): LaneAffectationAction {
        if (!!laneAffectation.laneAffectationTypeId) {
            return laneAffectation.laneNumber === -1 ? LaneAffectationAction.Add :  LaneAffectationAction.Update;
        } else
            return LaneAffectationAction.Delete;
    }
}

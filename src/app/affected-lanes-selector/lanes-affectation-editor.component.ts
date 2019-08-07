import { Component, ChangeDetectionStrategy, Input, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { LaneAffectationDTO, LaneAffectationTypeDTO, LaneAffectationEvent, LaneAffectationAction } from '../popup/popup.definitions';

// this constant is used to show the [+] button for a new lane affectation
const EMPTY_LANE_AFFECTATION: LaneAffectationDTO = {laneNumber: -1 };

@Component({
    selector: 'lanes-affectation-editor',
    template: `
      <div class="lanes-affectation-editor">
        <lane-affectation *ngFor="let laneAffectation of affectationsDataProvider; trackBy:trackByLaneNumber"
                          [availableLaneAffectationTypes]="availableLaneAffectationTypes"
                          [laneAffectation]="laneAffectation"
                          (laneAffectationChanged)="laneAffectationChanged($event)">
        </lane-affectation>
      </div>`,
    styleUrls: ['lane-affectation-style.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanesAffectationEditorComponent {
    @Output()  laneAffectationsChange: EventEmitter<Array<LaneAffectationDTO>> = new EventEmitter<Array<LaneAffectationDTO>>();

    @Input() availableLaneAffectationTypes: Array<LaneAffectationTypeDTO>;

    @Input()
    set laneAffectations(affectations: Array<LaneAffectationDTO>) {
        this.affectationsDataProvider = [...affectations.sort((a, b) => a.laneNumber - b.laneNumber), EMPTY_LANE_AFFECTATION];
        console.log('Affectations', this.affectationsDataProvider);
    }

    affectationsDataProvider: Array<LaneAffectationDTO>;

    trackByLaneNumber = (index, elem: LaneAffectationDTO) => elem.laneNumber;

    constructor(private cd: ChangeDetectorRef) {
    }

    laneAffectationChanged(event: LaneAffectationEvent) {
        console.log('laneAffectationChanged');

        const itemIndex = this.affectationsDataProvider.findIndex(_ => _.laneNumber === event.laneAffectation.laneNumber);

        switch (event.action) {
            case LaneAffectationAction.Add:
                console.log('ADD');
                this.affectationsDataProvider.splice(this.affectationsDataProvider.length - 1, 0,
                    {
                        ...event.laneAffectation,
                        laneNumber: this.affectationsDataProvider.length
                    });
                break;

            case LaneAffectationAction.Delete:
                console.log('DELETE');
                this.affectationsDataProvider.splice(itemIndex, 1);
                this.affectationsDataProvider.forEach(((affectation, i, arr) => affectation.laneNumber = i < arr.length - 1 ? i + 1 : -1));
                break;

            case LaneAffectationAction.Update:
                console.log('UPDATE');
                this.affectationsDataProvider.splice(itemIndex, 1, event.laneAffectation);
                break;
        }

        this.cd.markForCheck();
        this.laneAffectationsChange.emit(this.affectationsDataProvider.filter(_ => _.laneNumber !== -1));
    }
}

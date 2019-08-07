import { Component, OnInit } from '@angular/core';
import { PopupRef, LaneAffectationTypeDTO, AffectationPopupData } from '../../popup/popup.definitions';

@Component({
    templateUrl: './lane-affectation-popup.component.html',
    styleUrls: ['../lane-affectation-style.scss', './lane-affectation-popup.component.scss']
})
export class LaneAffectationPopupComponent implements OnInit {
    laneAffectationTypes: Array<LaneAffectationTypeDTO>;
popupData: AffectationPopupData;

    constructor(private popoverRef: PopupRef) {}

    ngOnInit() {

        this.popupData = this.popoverRef.data as AffectationPopupData;
    }

    close(laneAffectation: LaneAffectationTypeDTO = null) {
        this.popoverRef.close(laneAffectation);
    }
}

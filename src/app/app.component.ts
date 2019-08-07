import { Component } from '@angular/core';
import { LaneAffectationTypeDTO, LaneAffectationDTO } from './popup/popup.definitions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  config: Array<LaneAffectationTypeDTO> = [
    {
      id: '1',
      color: '#DBB000',
      icon: 'arrow_back',
      priority: 1
    }, {
      id: '2',
      color: '#DBB000',
      icon: 'arrow_forward',
      priority: 2
    },
    {
      id: '3',
      color: '#DBB000',
      icon: 'arrow_upward',
      priority: 3
    },
    {
      id: '4',
      color: '#F44336',
      icon: 'close',
      priority: 4
    },
    {
      id: '5',
      color: '#27AE60',
      icon: 'arrow_upward',
      priority: 5
    }];

  laneAffectations: Array<LaneAffectationDTO> = [
    {
      laneNumber: 2,
      laneAffectationTypeId: '1'
    },
    {
      laneNumber: 1,
      laneAffectationTypeId: '4'
    }
  ];

  log(value) {
    console.log('>> Affectations', value);
  }
}

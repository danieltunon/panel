import { Component } from '@angular/core';

import { PanelSizingService } from './../services/panel-sizing.service';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {

  constructor(panelSizingService: PanelSizingService) {

   }

}

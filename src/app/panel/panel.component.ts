import { Component, Input } from '@angular/core';

import { PanelSizingService } from './../services/panel-sizing.service';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent {
  @Input() header: string;
  constructor(panelSizingService: PanelSizingService) {

   }

}

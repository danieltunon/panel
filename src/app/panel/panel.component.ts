import { Component, Input } from '@angular/core';

import { PanelSizingService } from './../services/panel-sizing.service';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css'],
  host: {
    class: 'resizable-panel',
    '[style.flexBasis.px]': 'basis'
  }
})
export class PanelComponent {
  @Input() header: string;
  @Input() basis: number;
  constructor(panelSizingService: PanelSizingService) {

   }

}

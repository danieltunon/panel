import { Directive, Input } from '@angular/core';

import { PanelSizingService } from './../services/panel-sizing.service';

@Directive({
  selector: '[panel]',
  host: {
    class: 'resizable-panel',
    '[style.display]': "'flex'",
    '[style.flexGrow]': "1",
    // '[style.flexDirection]': "'column'",
    '[style.flexBasis.px]': 'basis',
  }
})
export class PanelDirective {
  @Input() header: string;
  @Input() basis: number;
  constructor(panelSizingService: PanelSizingService) {

   }

}

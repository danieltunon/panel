import
  { Component,
    Input,
    HostBinding,
    ContentChildren,
    QueryList,
    ElementRef,
    AfterContentInit,
  } from '@angular/core';

import { PanelComponent } from './../panel/panel.component';
import { PanelSizingService } from './../services/panel-sizing.service';

@Component({
  selector: 'panel-container',
  templateUrl: './panel-container.component.html',
  styleUrls: ['./panel-container.component.css'],
  providers: [PanelSizingService]
})
export class PanelContainerComponent implements AfterContentInit {
  containerWidth: any;
  el: ElementRef;

  @HostBinding('style.flexDirection') @Input() direction = 'row';
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  constructor(el: ElementRef, public panelSizingService: PanelSizingService) {
    this.el = el;
  }

  ngAfterContentInit() {
    console.log(this.el.nativeElement.clientWidth)
    this.panelSizingService.printMsg();
  }

}

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

@Component({
  selector: 'panel-container',
  templateUrl: './panel-container.component.html',
  styleUrls: ['./panel-container.component.css']
})
export class PanelContainerComponent implements AfterContentInit {
  @HostBinding('style.flexDirection') @Input() direction = 'row';

  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  constructor() { }

  ngAfterContentInit() {
  }

}

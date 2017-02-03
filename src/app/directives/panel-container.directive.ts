import
  { Directive,
    Input,
    HostBinding,
    ContentChildren,
    QueryList,
    ElementRef,
    AfterContentInit,
  } from '@angular/core';

import { PanelDirective } from './../directives/panel.directive';
import { PanelSizingService } from './../services/panel-sizing.service';

@Directive({
  selector: '[panel-container]',
  providers: [PanelSizingService],
  host: {
    '[class]': 'direction'
  }
})
export class PanelContainerDirective implements AfterContentInit {
  get containerDimension(): number {
    return this.direction === 'row'
      ? this.el.nativeElement.clientWidth
      : this.el.nativeElement.clientHeight;
  }
  el: ElementRef;
  panelSizes: number[];
  @HostBinding('style.flexDirection') @Input() direction = 'row';

  constructor(el: ElementRef, public panelSizingService: PanelSizingService) {
    this.el = el;
  }
  ngOnInit() {
    console.log(`init size ${this.el.nativeElement.clientWidth}`)
    console.log(`size is type ${typeof this.el.nativeElement.clientWidth}`)
  }
  ngAfterContentInit() {
    // console.log(this.el.nativeElement.clientWidth)
    // this.panelSizingService.printMsg();
    // this.panelSizes;
    // console.log(this.panels.map(p => p.basis))
  }

}

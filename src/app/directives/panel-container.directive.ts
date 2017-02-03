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
    '[style.display]': "'flex'",
  }
})
export class PanelContainerDirective implements AfterContentInit {
  @HostBinding('style.flexDirection') @Input() direction;

  get containerDimension(): number {
    return this.direction === 'row'
      ? this.el.nativeElement.clientWidth
      : this.el.nativeElement.clientHeight;
  }

  constructor(private el: ElementRef, public panelSizingService: PanelSizingService) {
    this.el = el;
  }

  ngOnInit() {
    console.log(`init size ${this.el.nativeElement.clientWidth}`)
  }

  ngAfterContentInit() {
    // console.log(this.el.nativeElement.clientWidth)
    // this.panelSizingService.printMsg();
    // this.panelSizes;
    // console.log(this.panels.map(p => p.basis))
  }

}

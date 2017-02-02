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
import { SplitterComponent } from './../splitter/splitter.component';
import { PanelSizingService } from './../services/panel-sizing.service';

@Component({
  selector: 'panel-container',
  templateUrl: './panel-container.component.html',
  styleUrls: ['./panel-container.component.less'],
  providers: [PanelSizingService]
})
export class PanelContainerComponent implements AfterContentInit {
  get containerDimension(): number {
    return this.direction === 'row'
      ? this.el.nativeElement.clientWidth
      : this.el.nativeElement.clientHeight;
  }
  el: ElementRef;
  panelSizes: number[];

  @HostBinding('style.flexDirection') @Input() direction = 'row';
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;
  @ContentChildren(SplitterComponent) splitters: QueryList<SplitterComponent>;

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
    this.panelSizes;
    console.log(this.panels.map(p => p.basis))
  }

}

import
  { Component,
    Input,
    HostBinding,
    ContentChildren,
    QueryList,
    ElementRef,
    AfterContentInit,
  } from '@angular/core';

@Component({
  selector: 'panel-container',
  templateUrl: './panel-container.component.html',
  styleUrls: ['./panel-container.component.less'],
  providers: [],
  host: {
    // '[class]': 'direction'
  }
})
export class PanelContainerComponent {

  constructor() { }

  // get containerDimension(): number {
  //   return this.direction === 'row'
  //     ? this.el.nativeElement.clientWidth
  //     : this.el.nativeElement.clientHeight;
  // }
  // el: ElementRef;
  // panelSizes: number[];

  // @HostBinding('style.flexDirection') @Input() direction = 'row';
  // // @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;
  // // @ContentChildren(SplitterComponent) splitters: QueryList<SplitterComponent>;

  // ngOnInit() {
  //   console.log(`init size ${this.el.nativeElement.clientWidth}`)
  //   console.log(`size is type ${typeof this.el.nativeElement.clientWidth}`)
  // }
  // ngAfterContentInit() {
  //   // console.log(this.el.nativeElement.clientWidth)
  //   // this.panelSizingService.printMsg();
  //   this.panelSizes;
  //   // console.log(this.panels.map(p => p.basis))
  // }

}

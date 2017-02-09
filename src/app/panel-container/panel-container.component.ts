import
  { Component,
    Input,
    HostBinding,
    HostListener,
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
    '[class]': 'direction',
    // '[class.dragging]': 'isDragging',
    // '[style.flexDirection]': 'direction',
  }
})
export class PanelContainerComponent {
  @HostBinding('style.flexDirection') @Input() direction: string = 'row';
  @HostBinding('class.resizing') isResizing: boolean = false;
  // private startCoord: number;

  // @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) {
  //   e.preventDefault();
  //   if (this.isResizing) {
  //     // handle resize
  //   }
  // }

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

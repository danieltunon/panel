import
  { Component,
    Input,
    HostBinding,
    HostListener,
    ContentChildren,
    ViewChildren,
    QueryList,
    ElementRef,
    AfterContentInit,
  } from '@angular/core';

  import { PanelComponent } from '../panel/panel.component';

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
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;
  @ViewChildren('splitter') splitters: QueryList<any>;
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

  // }
  ngAfterContentInit() {
    // console.log(this.el.nativeElement.clientWidth)
    // this.panelSizingService.printMsg();
    // console.log(this.panels.map(p => p.basis))
  }

}

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
  @HostBinding('class.resizing') private isResizing: boolean = false;
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;
  @ViewChildren('splitter') splitters: QueryList<any>;

  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) {
    e.preventDefault();
    if (this.isResizing) {
      this.handleResize(e);
    }
  }
  @HostListener('mouseup', ['$event']) endDrag(e: MouseEvent) {
    this.isResizing = false;
    this.handleResize(e);
  }

  private startPosition: number;

  constructor() { }

  startDrag(e) {
    this.isResizing = true;
    this.startPosition = e[`client${this.direction === 'row' ? 'X' : 'Y'}`];
  }

  handleResize(e) {
    let position: number = e[`client${this.direction === 'row' ? 'X' : 'Y'}`];
    console.log(e);
  }

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

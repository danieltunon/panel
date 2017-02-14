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
  private panelSizes;
  @ViewChildren('splitter') splitters: QueryList<ElementRef>;
  @Input() name: any;

  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) {
    e.preventDefault();
    if (this.isResizing) {
      this.handleResize(e);
    }
  }
  @HostListener('mouseup', ['$event']) endDrag(e: MouseEvent) {
    this.isResizing = false;
  }

  private startPosition: number;
  private activeSplitter: number;

  constructor(private el: ElementRef) { }

  startDrag({e, i}) {
    e.stopPropagation();
    this.isResizing = true;
    this.activeSplitter = i;
    this.startPosition = e[`client${this.direction === 'row' ? 'X' : 'Y'}`];

  }

  handleResize(e) {
    let dimesion = this.direction === 'row' ? 'width' : 'height';
    let position: number = e[`client${this.direction === 'row' ? 'X' : 'Y'}`];
    let splitterSize = this.splitters.toArray().reduce((total, s) => total + s.nativeElement.getBoundingClientRect()[dimesion], 0)
    let containerSize = this.el.nativeElement.getBoundingClientRect()[dimesion] - splitterSize;
    let panels = this.panels.toArray().slice(this.activeSplitter, this.activeSplitter + 2);
    console.log(this.name, 'b4', 'panel1', panels[0].flexBasis, 'panel2', panels[1].flexBasis)
    panels[0].flexBasis += position - this.startPosition;
    panels[1].flexBasis -= position - this.startPosition;
    console.log(this.name, 'after', 'panel1', panels[0].flexBasis, 'panel2', panels[1].flexBasis)
    this.startPosition = position;
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
  ngAfterViewInit() {
    // console.log(this.el.nativeElement.clientWidth)
    // this.panelSizingService.printMsg();
    // console.log(this.panels.map(p => p.basis))
    let dimesion = this.direction === 'row' ? 'width' : 'height';
    let containerSize = this.el.nativeElement.getBoundingClientRect()[dimesion] -
                        this.splitters.toArray().reduce((total, s) => total + s.nativeElement.getBoundingClientRect()[dimesion], 0);
    this.panelSizes = this.panels.toArray().map((p, i, a) => containerSize / a.length)
    console.log(this.panelSizes)
    window.setTimeout(() => this.panels.forEach((p, i) => p.flexBasis = this.panelSizes[i]));
  }

}

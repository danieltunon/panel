import {
  Component,
  Input,
  ContentChildren,
  ContentChild,
  ViewChild,
  QueryList,
  OnInit,
  EventEmitter,
  HostListener,
  HostBinding,
  Optional,
  SkipSelf,
  forwardRef,
  Inject,
  ElementRef
} from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
import { PanelSizingService, Orientation } from './panel-sizing.service';

@Component({
  selector: 'panel-container',
  templateUrl: './panel-container.component.html',
  styleUrls: ['./panel-container.component.less'],
  providers: [
    {provide: 'Window', useValue: window},
    PanelSizingService,
  ]
})
export class PanelContainerComponent {
  private parentContainer: PanelContainerComponent = null;
  @Input() name: string;
  @HostBinding('class') @Input() orientation: string = 'vertical';
  @Input() panelQuantity: number;
  // @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  containerSize: number;

  firstFlexBasis: number;
  secondFlexBasis: number;
  thirdFlexBasis: number;

  targets: Array<string>;
  isResizing: boolean = false;
  dimension: string;
  axis: string;
  startCoordinate: number;

  constructor(
    @Inject('Window') private window: Window,
    // @SkipSelf() @Optional() private parent: PanelContainerComponent,
    // @SkipSelf() @Optional() private parentPanel: PanelComponent,
    private sizingService: PanelSizingService,
    private el: ElementRef,
  ) {
    // sizingService.setOrientation(Orientation.Vertical);
    // sizingService.setHostContainer(this);
  }

  ngOnInit() {
    // console.log(this.name, 'init', this.parentPanel)
    // if (!this.parentContainer) {
      this.containerSize = this.window.innerWidth - (this.panelQuantity - 1) * 4;
    // }
    this.firstFlexBasis = this.containerSize / this.panelQuantity;
    this.secondFlexBasis = this.containerSize / this.panelQuantity;
    this.thirdFlexBasis = this.containerSize / this.panelQuantity;
    switch (this.orientation) {
      case 'horizontal':
        this.dimension = 'height';
        this.axis = 'clientY';
        break;
      case 'vertical':
      default:
        this.dimension = 'width';
        this.axis = 'clientX';
        break;
    }
  }

  // @ContentChildren(PanelContainerComponent) nestedPanelContainerC;
  // ngAfterContentInit() {
  //   console.log(this.name, 'cont', this.nestedPanelContainerC)
  // }

  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) { this.onResize(e) }
  @HostListener('mouseup', ['$event']) onMouseUp(e: MouseEvent) { this.endResize(e) }
  // onMouseDown(e: MouseEvent, targets: Array<string>) {
  //   this.startResize(e, targets);
  // }

  onResize(e: MouseEvent) {
    e.preventDefault();
    if (this.isResizing) {
      let delta: number = e[this.axis] - this.startCoordinate;
      this[`${this.targets[0]}FlexBasis`] += delta;
      this[`${this.targets[1]}FlexBasis`] -= delta;
      this.startCoordinate = e[this.axis]

    }
  }
  endResize(e: MouseEvent) {
    this.isResizing = false;
  }
  startResize(e: MouseEvent, targets: Array<string>) {
    this.isResizing = true;
    this.targets = targets;
    this.startCoordinate = e[this.axis];
  }

  // @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) { this.sizingService.onResize(e) }
  // @HostListener('mouseup', ['$event']) onMouseUp(e: MouseEvent) { this.sizingService.endResize(e) }
  // onMouseDown(e: MouseEvent, splitterIndex: number) {
  //   this.sizingService.startResize(e, splitterIndex);
  // }

}

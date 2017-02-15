import {
  Component,
  Input,
  ContentChildren,
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
  @HostBinding('class') @Input() orientation: Orientation = Orientation.Vertical;
  @Input() panelQuantity: number;
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  firstFlexBasis: number;
  secondFlexBasis: number;
  thirdFlexBasis: number;

  containerSize: number;

  constructor(
    @Inject('Window') private window: Window,
    @SkipSelf() @Optional() private parent: PanelContainerComponent,
    private sizingService: PanelSizingService,
    private el: ElementRef,
  ) {
    sizingService.setOrientation(Orientation.Vertical);
    sizingService.setHostContainer(this);
    console.log(el)
  }

  ngOnInit() {
    console.log(this.name, 'init', this.parent)
    // if (!this.parentContainer) {
      this.containerSize = this.window.innerWidth - (this.panelQuantity - 1) * 4;
    // }
    this.firstFlexBasis = this.containerSize / 3;
    this.secondFlexBasis = this.containerSize / 3;
    this.thirdFlexBasis = this.containerSize / 3;
  }

  ngAfterViewInit() {
     window.setTimeout(() => this.sizingService.initializePanelSizes(this.panels.toArray()));
  }

  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) { this.sizingService.onResize(e) }
  @HostListener('mouseup', ['$event']) onMouseUp(e: MouseEvent) { this.sizingService.endResize(e) }
  onMouseDown(e: MouseEvent, splitterIndex: number) {
    this.sizingService.startResize(e, splitterIndex);
  }
  // @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) { this.sizingService.onResize(e) }
  // @HostListener('mouseup', ['$event']) onMouseUp(e: MouseEvent) { this.sizingService.endResize(e) }
  // onMouseDown(e: MouseEvent, splitterIndex: number) {
  //   this.sizingService.startResize(e, splitterIndex);
  // }

}

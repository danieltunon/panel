import {
  Component,
  Input,
  ContentChildren,
  QueryList,
  OnInit,
  EventEmitter,
  HostListener,
  Optional,
  SkipSelf,
  forwardRef,
  Inject,
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
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  containerSize: number;

  constructor(
    @Inject('Window') private window: Window,
    @SkipSelf() @Optional() private parent: PanelContainerComponent,
    private sizingService: PanelSizingService,
  ) {
    sizingService.setOrientation(Orientation.Vertical);
    sizingService.setHostContainer(this);
    console.log(parent);
  }

  ngOnInit() {
    console.log(this.parent)
    // if (!this.parentContainer) {
      this.containerSize = this.window.innerWidth;
    // }
    this.sizingService.firstFlexBasis = this.containerSize / 3;
    this.sizingService.secondFlexBasis = this.containerSize / 3;
    this.sizingService.thirdFlexBasis = this.containerSize / 3;
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

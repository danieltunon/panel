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
} from '@angular/core';
import { PanelComponent } from '../panel/panel.component';
import { IPanelContainer } from '../panel-container/panel-container';
import { PanelSizingService, Orientation } from '../panel-container/panel-sizing.service';

@Component({
  selector: 'vertical-panel-container',
  templateUrl: './vertical-panel-container.component.html',
  styleUrls: ['./vertical-panel-container.component.less'],
  providers: [
    {provide: IPanelContainer, useExisting: forwardRef(() => VerticalPanelContainerComponent)},
    PanelSizingService,
  ]
})
export class VerticalPanelContainerComponent implements IPanelContainer {
  private parentContainer: IPanelContainer = null;
  @Input() name: string;
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  constructor(
    @SkipSelf() @Optional() private parent: IPanelContainer,
    private sizingService: PanelSizingService,
  ) {
    sizingService.setOrientation(Orientation.Vertical);
  }

  ngOnInit() {
  }

  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) { this.sizingService.onMouseMove(e) }
  @HostListener('mouseup', ['$event']) endDrag(e: MouseEvent) { this.sizingService.endDrag(e) }
  startDrag(e: MouseEvent) {
    this.sizingService.startDrag();
  }

}

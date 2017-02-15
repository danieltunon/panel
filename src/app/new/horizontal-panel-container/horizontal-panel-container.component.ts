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
  selector: 'horizontal-panel-container',
  templateUrl: './horizontal-panel-container.component.html',
  styleUrls: ['./horizontal-panel-container.component.less'],
  providers: [
    {provide: IPanelContainer, useExisting: forwardRef(() => HorizontalPanelContainerComponent)},
    PanelSizingService,
  ]
})
export class HorizontalPanelContainerComponent implements IPanelContainer {
  private parentContainer: IPanelContainer = null;
  @Input() public name: string;
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;

  constructor(
    @SkipSelf() @Optional() private parent: IPanelContainer,
    private sizingService: PanelSizingService,
  ) {
    sizingService.setOrientation(Orientation.Horizontal);
  }

  ngOnInit() {
  }

  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) { this.sizingService.onMouseMove(e) }
  @HostListener('mouseup', ['$event']) endDrag(e: MouseEvent) { this.sizingService.endDrag(e) }
  startDrag(e: MouseEvent) { this.sizingService.startDrag() }

}

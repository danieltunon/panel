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

@Component({
  selector: 'horizontal-panel-container',
  templateUrl: './horizontal-panel-container.component.html',
  styleUrls: ['./horizontal-panel-container.component.less'],
  providers: [{provide: IPanelContainer, useExisting: forwardRef(() => HorizontalPanelContainerComponent)}]
})
export class HorizontalPanelContainerComponent implements IPanelContainer {
  @Input() public name: string;
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;
  private parentContainer: IPanelContainer = null;

  constructor(@SkipSelf() @Optional() private parent: IPanelContainer) { }

  ngOnInit() {
  }

  startDrag(e: MouseEvent) {
    console.log(e);
  }

}

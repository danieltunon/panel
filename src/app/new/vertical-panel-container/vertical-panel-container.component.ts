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
  selector: 'vertical-panel-container',
  templateUrl: './vertical-panel-container.component.html',
  styleUrls: ['./vertical-panel-container.component.less'],
  providers: [{provide: IPanelContainer, useExisting: forwardRef(() => VerticalPanelContainerComponent)}]
})
export class VerticalPanelContainerComponent implements IPanelContainer {
  @Input() name: string;
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;
  private parentContainer: IPanelContainer = null;

  constructor(@SkipSelf() @Optional() private parent: IPanelContainer) { }

  ngOnInit() {
  }

}

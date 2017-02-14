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
import { PanelContainerComponent } from '../panel-container/panel-container';

@Component({
  selector: 'vertical-panel-container',
  templateUrl: './vertical-panel-container.component.html',
  styleUrls: ['./vertical-panel-container.component.less'],
  providers: [{provide: PanelContainerComponent, useExisting: forwardRef(() => VerticalPanelContainerComponent)}]
})
export class VerticalPanelContainerComponent implements PanelContainerComponent {
  @Input() name: string;
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;
  private parentContainer: PanelContainerComponent = null;

  constructor(@SkipSelf() @Optional() private parent: PanelContainerComponent) { }

  ngOnInit() {
  }

}

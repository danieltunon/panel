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
  selector: 'horizontal-panel-container',
  templateUrl: './horizontal-panel-container.component.html',
  styleUrls: ['./horizontal-panel-container.component.less'],
  providers: [{provide: PanelContainerComponent, useExisting: forwardRef(() => HorizontalPanelContainerComponent)}]
})
export class HorizontalPanelContainerComponent implements PanelContainerComponent {
  @Input() public name: string;
  @ContentChildren(PanelComponent) panels: QueryList<PanelComponent>;
  private parentContainer: PanelContainerComponent = null;

  constructor(@SkipSelf() @Optional() private parent: PanelContainerComponent) { }

  ngOnInit() {
  }

}

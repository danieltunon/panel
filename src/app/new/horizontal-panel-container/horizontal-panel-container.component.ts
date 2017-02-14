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
import { VerticalPanelContainerComponent } from '../vertical-panel-container/vertical-panel-container.component';

export abstract class PanelContainerComponent {
  panels: QueryList<PanelComponent>;
  name: string;
}

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

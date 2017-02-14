import { QueryList } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';

export abstract class PanelContainerComponent {
  panels: QueryList<PanelComponent>;
  name: string;
}

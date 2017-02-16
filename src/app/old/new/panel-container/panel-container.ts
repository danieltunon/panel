import { QueryList } from '@angular/core';
import { PanelComponent } from '../panel/panel.component';

export abstract class IPanelContainer {
  panels: QueryList<PanelComponent>;
  name: string;
}

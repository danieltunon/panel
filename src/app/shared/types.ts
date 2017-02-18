import { QueryList, ElementRef } from '@angular/core';

export abstract class IPanelContainer {
  panels: QueryList<ElementRef>;
  orientation: string;
  name: string;
  requestPanelDimensions: Function;
}

export interface IContainerSize {
  width: number;
  height: number;
}

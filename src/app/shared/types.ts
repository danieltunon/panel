import { QueryList, ElementRef } from '@angular/core';

export abstract class IPanelContainer {
  panels: QueryList<ElementRef>;
  orientation: string;
  name: string;
  requestPanelDimension$: Function;
  addChildContainer: Function;
}

export interface IContainerSize {
  width: number;
  height: number;
}

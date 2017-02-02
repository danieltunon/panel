import { Injectable } from '@angular/core';

@Injectable()
export class PanelSizingService {
  containerDimension: number;

  constructor() { }

  setContainerDimension(val: number) {
    this.containerDimension = val;
  }

}

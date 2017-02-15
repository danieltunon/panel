import { Injectable, HostListener } from '@angular/core';

export enum Orientation {
  Vertical,
  Horizontal
}

@Injectable()
export class PanelSizingService {
  private isResizing = false;
  private startCoordinate: number;
  private dimension: string;
  private axis: string;

  onMouseMove(e: MouseEvent) {
    e.preventDefault();
    if (this.isResizing) {
      console.log('dragging in service for')
    }
  }
  endDrag(e: MouseEvent) {
    this.isResizing = false;
    console.log('ending drag in service for')
  }
  startDrag() {
    this.isResizing = true;
    console.log('starting drag in service for')
  }
  setOrientation(o: Orientation) {
    switch (o) {
      case Orientation.Vertical:
        this.dimension = 'height';
        this.axis = 'Y';
        break;
      case Orientation.Horizontal:
      default:
        this.dimension = 'width';
        this.axis = 'X';
        break;
    }
  }

  constructor() { }

}

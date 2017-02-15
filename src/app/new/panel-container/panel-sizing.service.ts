import { Injectable, ElementRef } from '@angular/core';
import { IPanelContainer } from './panel-container';
import { PanelComponent } from '../panel/panel.component';

export enum Orientation {
  Vertical,
  Horizontal
}

@Injectable()
export class PanelSizingService {
  private hostContainer: IPanelContainer;
  private hostEl: HTMLElement;
  private dimension: string;
  private axis: string;
  private isResizing = false;
  private startCoordinate: number;
  private activeSplitter: number;
  private panelSizes: Array<number>;

  onResize(e: MouseEvent) {
    e.preventDefault();
    if (this.isResizing) {
      console.log(this.panelSizes)
      let delta: number = e[this.axis] - this.startCoordinate;
      this.panelSizes[this.activeSplitter] += delta;
      this.panelSizes[this.activeSplitter + 1] -= delta;
    }
  }
  endResize(e: MouseEvent) {
    this.isResizing = false;
  }
  startResize(e: MouseEvent, i: number) {
    this.isResizing = true;
    this.activeSplitter = i;
    this.startCoordinate = e[this.axis];
  }
  setOrientation(o: Orientation) {
    switch (o) {
      case Orientation.Vertical:
        this.dimension = 'height';
        this.axis = 'clientY';
        break;
      case Orientation.Horizontal:
      default:
        this.dimension = 'width';
        this.axis = 'clientX';
        break;
    }
  }
  setHostContainer(h: IPanelContainer) {
    this.hostContainer = h;
  }
  initializePanelSizes(ps: Array<PanelComponent>) {
    console.log('init')
    this.panelSizes = Array(ps.length).fill(this.hostEl.getBoundingClientRect()[this.dimension] / ps.length);
    this.hostContainer.panels.forEach((p, i) => p.setFlexBasis(this.panelSizes[i]));
  }

  constructor(hostEl: ElementRef) {
    this.hostEl = hostEl.nativeElement;
  }

}

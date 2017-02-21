import { Injectable, QueryList, ElementRef, Renderer } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/distinctUntilChanged';

import { IPanelContainer, IContainerSize } from '../shared/types';
import { PanelDirective } from '../shared/panel.directive';

interface IPanelSizesOperation extends Function {
  (panelSizes: Map<HTMLElement, number>): Map<HTMLElement, number>;
}

@Injectable()
export class PanelSizingService {
  private _container: ElementRef;
  private _containerSize: IContainerSize;
  private _parentPanel: PanelDirective;
  private _parentContainer: IPanelContainer;
  private _numberOfPanels: number;
  private _panels: QueryList<ElementRef>;
  private _panelSize$: Observable<Map<HTMLElement, number>>;
  private _containerDimensions: IContainerSize;
  private _resizableAxis: string;
  private _resizableDimension: string;
  private _defaultPanelSize: number;

  startDrag$: Subject<{e: MouseEvent, targets: Array<HTMLElement>}> = new Subject();
  endDrag$: Subject<any> = new Subject();
  drag$: Subject<any> = new Subject();

  resize$ = this.startDrag$.concatMap( start => {
    return this.drag$
      .scan((acc, curr) => ({
        startPosition: curr[this._resizableAxis],
        delta: curr[this._resizableAxis] - acc.startPosition
      }), {startPosition: start.e[this._resizableAxis], delta: 0})
      .map(resize => ({delta: resize.delta, targets: start.targets}))
      .takeUntil(this.endDrag$);
  });

  updateSize$ = new Subject();

  constructor(private _renderer: Renderer) {
    this.resize$.subscribe(resize => {
      this.incrementPanelValue(resize.targets[0], resize.delta);
      this.decrementPanelValue(resize.targets[1], resize.delta);
    });
  }

  setOrientation(o: string) {
    switch (o) {
      case 'horizontal':
        this._resizableDimension = 'height';
        this._resizableAxis = 'clientY';
        break;
      case 'vertical':
      default:
        this._resizableDimension = 'width';
        this._resizableAxis = 'clientX';
        break;
    }
  }

  setContainerSize() {
    if (!this._parentContainer) {
      let rect: ClientRect = this._container.nativeElement.getBoundingClientRect();
      this._containerSize = {
        width: rect.width,
        height: rect.height
      }
    } else {
      this._parentContainer.requestPanelDimension$(this._parentPanel)
        .subscribe((dimensions: IContainerSize) => this._containerSize = dimensions);
      // this._parentContainer.requestPanelDimensions$(this._container.nativeElement.parentElement);
    }
  }

  setPanels(panels: QueryList<ElementRef>) {
    this._panels = panels;
    let initialPanelSizes: Map<HTMLElement, number> = new Map();
    panels.forEach(p => initialPanelSizes.set(p.nativeElement, this._getDefaultPanelSize()));
    this._panelSize$ = this.updateSize$
      .scan((panelSizes: Map<HTMLElement, number>,
             operation: IPanelSizesOperation) => {
               return operation(panelSizes);
             }, initialPanelSizes)
      .publishReplay(1)
      .refCount()
      .startWith(initialPanelSizes)
    this._panelSize$.subscribe(sizes => sizes.forEach(this.setFlexBasis));
  }

  setFlexBasis (value, panel) {
    this._renderer.setElementStyle(panel, 'flex-basis', `${value}px`);
  }

  init(container: ElementRef, parentContainer: IPanelContainer, parentPanel: PanelDirective, numPanels: number) {
    this._container = container;
    this._parentContainer = parentContainer;
    this._parentPanel = parentPanel;
    this._numberOfPanels = numPanels;
  }

  private _getDefaultPanelSize(): number {
    let numPanels = this._numberOfPanels;
    let numSplitters = numPanels - 1;
    return (this._containerSize[this._resizableDimension] - (4 * numSplitters)) / numPanels;
  }

  public requestPanelSize$(panel: HTMLElement): Observable<IContainerSize> {
    return this._panelSize$
      .map(sizes => sizes.get(panel))
      .distinctUntilChanged()
      .map(val =>
        Object.assign({}, this._containerSize, {[this._resizableDimension]: val})
      )
      .publishReplay(1)
      .refCount();
  }

  incrementPanelValue(panel: HTMLElement, value: number) {
    this.updateSize$.next(sizes => sizes.set(panel, sizes.get(panel) + value));
  }

  decrementPanelValue(panel: HTMLElement, value: number) {
    this.updateSize$.next(sizes => sizes.set(panel, sizes.get(panel) - value));
  }

  proportionalReszize() {

  }

}

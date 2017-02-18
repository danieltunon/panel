import {
  Component, OnInit,
  Input, HostBinding, HostListener,
  ViewChildren, QueryList,
  Renderer, ElementRef,
  forwardRef, SkipSelf, Optional,
} from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/takeUntil';

import { IPanelContainer, IContainerSize } from '../shared/types';
import { DualPanelComponent } from  '../dual-panel/dual-panel.component';

@Component({
  selector: 'tri-panel',
  templateUrl: './tri-panel.component.html',
  styleUrls: ['./tri-panel.component.less'],
  providers: [
    {provide: IPanelContainer, useExisting: forwardRef(() => TriPanelComponent)},
  ]
})
export class TriPanelComponent implements OnInit {
  @Input() name: string;
  @Input() orientation: string;
  @HostBinding('style.flexDirection') private _flexDirection: string;
  @ViewChildren('panel1,panel2,panel3') panels: QueryList<ElementRef>;
  private _panelSizes: Map<HTMLElement, number> = new Map();
  private _containerChildren: Array<DualPanelComponent|TriPanelComponent> = [];
  // TODO: rename to containerDimensions or something
  private _containerSize: IContainerSize;
  private _axis: string;
  private _dimension: string;
  private _defaultPanelSize: number;

  startResize$: Subject<any> = new Subject();
  endResize$: Subject<any> = new Subject();
  resize$: Subject<any> = new Subject();
  drag$ = this.startResize$.concatMap( start => {
    return this.resize$
      .scan((acc, curr) => ({
        startPosition: curr[this._axis],
        delta: curr[this._axis] - acc.startPosition
      }), {startPosition: start.e[this._axis], delta: 0})
      .map(resize => ({delta: resize.delta, targets: start.targets}))
      .takeUntil(this.endResize$);
  });

  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) { e.preventDefault(); this.resize$.next(e) }
  @HostListener('mouseup', ['$event']) onMouseUp(e: MouseEvent) { this.endResize$.next(e) }
  // onMouseDown(e: MouseEvent, targets: Array<ElementRef>) {
  //   this.startResize$.next({e, targets});
  // }

  constructor(
    private _renderer: Renderer,
    private _element: ElementRef,
    @SkipSelf() @Optional() private _parentContainer: IPanelContainer,) { }

  ngOnInit() {
    this._checkOrientation();
    this._setContainerSize();
    switch (this.orientation) {
      case 'horizontal':
        this._dimension = 'height';
        this._axis = 'clientY';
        break;
      case 'vertical':
      default:
        this._dimension = 'width';
        this._axis = 'clientX';
        break;
    }

    this.drag$.subscribe(resize => {
      this._panelSizes.set(resize.targets[0], this._panelSizes.get(resize.targets[0]) + resize.delta);
      this._panelSizes.set(resize.targets[1], this._panelSizes.get(resize.targets[1]) - resize.delta);
      this.setFB();
      this._containerChildren.forEach(c => { c._setContainerSize(); c.setFB() })
    });

    if (this._parentContainer) this._parentContainer.addChildContainer(this);
  }

  ngAfterViewInit() {
    this.panels.forEach(p => this._panelSizes.set(p.nativeElement, this._getDefaultPanelSize()));
    this.setFB();
  }

  setFB() {
    console.log(this.name, 'called fb')
    this.panels.forEach(p => {
      this._renderer.setElementStyle(p.nativeElement, 'flex-basis', `${this._panelSizes.get(p.nativeElement)}px`)
    });
  }

  private _checkOrientation() {
    if (this.orientation !== 'vertical' && this.orientation !== 'horizontal') {
      throw new Error(`Panel container orientation must be either 'vertical' or 'horizontal'. Example: <tri-panel [orientation]="'horizontal'">`);
    }
    this._flexDirection = this.orientation === 'vertical' ? 'row' : 'column';
  }

  public _setContainerSize() {
    console.log(this.name, 'called scs')
    if (!this._parentContainer) {
      let rect: ClientRect = this._element.nativeElement.getBoundingClientRect();
      this._containerSize = {
        width: rect.width,
        height: rect.height
      }
    } else {
      this._containerSize = this._parentContainer.requestPanelDimensions(this._element.nativeElement.parentElement);
    }
  }

  private _getDefaultPanelSize(): number {
    return (this._containerSize[this._dimension] - 8) / 3;
  }

  private _requestParentNotifications(parent: DualPanelComponent|TriPanelComponent) {
    parent.addChildContainer(this);
  }

  public addChildContainer(child: DualPanelComponent|TriPanelComponent) {
    this._containerChildren.push(child);
  }

  public requestPanelDimensions(panel: HTMLElement): IContainerSize {
    return Object.assign({}, this._containerSize, {[this._dimension]: this._panelSizes.get(panel) || this._getDefaultPanelSize()});
  }

}

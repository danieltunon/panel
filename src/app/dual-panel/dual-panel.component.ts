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
import { PanelDirective } from '../shared/panel.directive';
import { TriPanelComponent } from '../tri-panel/tri-panel.component';

@Component({
  selector: 'dual-panel',
  templateUrl: './dual-panel.component.html',
  styleUrls: ['./dual-panel.component.less'],
  providers: [
    {provide: IPanelContainer, useExisting: forwardRef(() => DualPanelComponent)},
  ]
})
export class DualPanelComponent implements OnInit {
  @Input() name: string;
  @Input() orientation: string;
  @HostBinding('style.flexDirection') private _flexDirection: string;
  @ViewChildren('panel1,panel2') panels: QueryList<ElementRef>;
  private _panelSizes: Map<HTMLElement, number> = new Map();
  private _containerChildren: Array<DualPanelComponent|TriPanelComponent> = [];
    // TODO: rename to containerDimensions or something
  private _containerSize: IContainerSize;
  private _axis: string;
  private _dimension: string;
  private _defaultPanelSize: number;
  public collapsedPanel: HTMLElement;

  startDrag$: Subject<any> = new Subject();
  endDrag$: Subject<any> = new Subject();
  dragging$: Subject<any> = new Subject();
  resize$ = this.startDrag$.concatMap( start => {
    return this.dragging$
      .scan((acc, curr) => ({
        startPosition: curr[this._axis],
        delta: curr[this._axis] - acc.startPosition
      }), {startPosition: start.e[this._axis], delta: 0})
      .map(resize => ({delta: resize.delta, targets: start.targets}))
      .takeUntil(this.endDrag$);
  });

  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) { e.preventDefault(); this.dragging$.next(e) }
  @HostListener('mouseup', ['$event']) onMouseUp(e: MouseEvent) { this.endDrag$.next(e) }

  constructor(
    private _renderer: Renderer,
    private _element: ElementRef,
    @SkipSelf() @Optional() private _parentContainer: IPanelContainer,
    @Optional() private _parentPanel: PanelDirective,) { }

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

    this.resize$.subscribe(resize => {
      this._panelSizes.set(resize.targets[0], this._panelSizes.get(resize.targets[0]) + resize.delta);
      this._panelSizes.set(resize.targets[1], this._panelSizes.get(resize.targets[1]) - resize.delta);
      this.setFB();
      this._containerChildren.forEach(c => { c.proportionalResize() })
    });

    if (this._parentContainer) this._parentContainer.addChildContainer(this);
  }

  public init() {
    this._setContainerSize()
    this._setDefaultPanelSizes()
    this.setFB();
  }

  ngAfterViewInit() {
    this.init();
    this._containerChildren.forEach(c => { c.init() })

  }

  setFB() {
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
    return (this._containerSize[this._dimension] - 4) / 2;
  }

  private _setDefaultPanelSizes() {
    this.panels.forEach(p => this._panelSizes.set(p.nativeElement, this._getDefaultPanelSize()));
  }

  public addChildContainer(child: DualPanelComponent|TriPanelComponent) {
    this._containerChildren.push(child);
  }

  public requestPanelDimensions(panel: HTMLElement): IContainerSize {
    return Object.assign({}, this._containerSize, {[this._dimension]: this._panelSizes.get(panel) || this._getDefaultPanelSize()});
  }

  public proportionalResize() {
    const newSize: IContainerSize = this._parentContainer.requestPanelDimensions(this._element.nativeElement.parentElement);
    const ratio: number = newSize[this._dimension] / this._containerSize[this._dimension];
    this._panelSizes.forEach((val, panel) => {
      this._panelSizes.set(panel, val * ratio);
    });
    this._containerSize = newSize;
    this.setFB();
  }

  collapsePanel(toggledPanel: HTMLElement) {
    if (this.collapsedPanel === toggledPanel) {
      this._panelSizes.forEach((v, p) => {
        this._panelSizes.set(p, this._getDefaultPanelSize());
      })
      this.collapsedPanel = null;
    } else {
      const difference: number = this._panelSizes.get(toggledPanel) - 36;
      this._panelSizes.forEach((v, p) => {
        if (p === toggledPanel) {
          this._panelSizes.set(p, 36);
        } else {
          this._panelSizes.set(p, v + difference);
        }
      });
      this.collapsedPanel = toggledPanel;
    }
    this.setFB();
  }

}

import { Component, OnInit, Input, HostBinding, HostListener, Renderer, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'tri-panel',
  templateUrl: './tri-panel.component.html',
  styleUrls: ['./tri-panel.component.less']
})
export class TriPanelComponent implements OnInit {
  @Input() orientation: string;
  @Input('initialSize') private _containerSize: number;
  @HostBinding('style.flexDirection') private _flexDirection: string;
  @ViewChildren('panel1,panel2,panel3') panels: QueryList<ElementRef>;
  private _panelSizes: Map<HTMLElement, number> = new Map();

  private _axis: string;
  private _dimension: string;

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

  constructor(private _renderer: Renderer, private _element: ElementRef) { }

  ngOnInit() {
    this._checkOrientation()
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
    })

  }

  ngAfterViewInit() {
    this.panels.forEach(p => this._panelSizes.set(p.nativeElement, (this._containerSize - 8) / 3));

    this.setFB();
  }

  setFB() {
    this.panels.forEach(p => {
      this._renderer.setElementStyle(p.nativeElement, 'flex-basis', `${this._panelSizes.get(p.nativeElement)}px`)
    })
  }

  private _checkOrientation() {
    if (this.orientation !== 'vertical' && this.orientation !== 'horizontal') {
      throw new Error(`Panel container orientation must be either 'vertical' or 'horizontal'. Example: <tri-panel [orientation]="'horizontal'">`);
    }
    this._flexDirection = this.orientation === 'vertical' ? 'row' : 'column';
  }

}

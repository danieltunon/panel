import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'dual-panel',
  templateUrl: './dual-panel.component.html',
  styleUrls: ['./dual-panel.component.less']
})
export class DualPanelComponent implements OnInit {
  @Input() orientation: string;
  @HostBinding('style.flexDirection') private _flexDirection: string;

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
      .map(r => r.delta)
      .takeUntil(this.endResize$);
  });

  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) { e.preventDefault(); this.resize$.next(e) }
  @HostListener('mouseup', ['$event']) onMouseUp(e: MouseEvent) { this.endResize$.next(e) }
  // onMouseDown(e: MouseEvent, targets: Array<ElementRef>) {
  //   this.startResize$.next({e, targets});
  // }

  constructor() { }

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
  }

  private _checkOrientation() {
    if (this.orientation !== 'vertical' && this.orientation !== 'horizontal') {
      throw new Error(`Panel container orientation must be either 'vertical' or 'horizontal'. Example: <tri-panel [orientation]="'horizontal'">`);
    }
    this._flexDirection = this.orientation === 'vertical' ? 'row' : 'column';
  }

}

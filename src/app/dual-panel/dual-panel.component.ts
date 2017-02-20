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
import { PanelSizingService } from '../shared/panel-sizing.service';
import { TriPanelComponent } from '../tri-panel/tri-panel.component';

@Component({
  selector: 'dual-panel',
  templateUrl: './dual-panel.component.html',
  styleUrls: ['./dual-panel.component.less'],
  providers: [
    PanelSizingService,
    {provide: IPanelContainer, useExisting: forwardRef(() => DualPanelComponent)},
  ]
})
export class DualPanelComponent implements OnInit {
  @Input() name: string;
  @Input() orientation: string;
  @HostBinding('style.flexDirection') private _flexDirection: string;
  @ViewChildren('panel1,panel2') panels: QueryList<ElementRef>;

  private _containerChildren: Array<DualPanelComponent|TriPanelComponent> = [];

  @HostListener('mousemove', ['$event']) onMouseMove(e: MouseEvent) { e.preventDefault(); this._sizingService.drag$.next(e) }
  @HostListener('mouseup', ['$event']) onMouseUp(e: MouseEvent) { this._sizingService.endDrag$.next(e) }
  onMousedown(payload: {e: MouseEvent, targets: Array<ElementRef>}) {
    this._sizingService.startDrag$.next(payload);
  }

  constructor(
    private _sizingService: PanelSizingService,
    private _renderer: Renderer,
    private _element: ElementRef,
    @SkipSelf() @Optional() private _parentContainer: IPanelContainer,
    @Optional() private _parentPanel: PanelDirective,) {
      _sizingService.init(_element, _parentContainer, _parentPanel, 2);
    }

  ngOnInit() {
    this._checkOrientation();
    this._flexDirection = this.orientation === 'vertical' ? 'row' : 'column';
    this._sizingService.setContainerSize();

    // if (this._parentContainer) this._parentContainer.addChildContainer(this);
  }

  ngAfterViewInit() {
    this._sizingService.setPanels(this.panels);
  }

  private _checkOrientation() {
    if (this.orientation !== 'vertical' && this.orientation !== 'horizontal') {
      throw new Error(`Panel container orientation must be either 'vertical' or 'horizontal'. Example: <tri-panel [orientation]="'horizontal'">`);
    }
  }

  private _requestParentNotifications(parent: DualPanelComponent|TriPanelComponent) {
    parent.addChildContainer(this);
  }

  public addChildContainer(child: DualPanelComponent|TriPanelComponent) {
    this._containerChildren.push(child);
  }

  public requestPanelDimensions(panel: HTMLElement): IContainerSize {
    return this._sizingService.getPanelDimensions(panel);
  }

}

import { Component, OnInit, Input, HostBinding, /*Renderer, ElementRef*/ } from '@angular/core';

@Component({
  selector: 'tri-panel',
  templateUrl: './tri-panel.component.html',
  styleUrls: ['./tri-panel.component.less']
})
export class TriPanelComponent implements OnInit {
  @Input() orientation: string;
  @HostBinding('style.flexDirection') private _flexDirection: string;

  constructor(/*private _renderer: Renderer, private _element: ElementRef*/) { }

  ngOnInit() {
    this._checkOrientation()
  }

  private _checkOrientation() {
    if (this.orientation !== 'vertical' && this.orientation !== 'horizontal') {
      throw new Error(`Panel container orientation must be either 'vertical' or 'horizontal'. Example: <tri-panel [orientation]="'horizontal'">`);
    }
    this._flexDirection = this.orientation === 'vertical' ? 'row' : 'column';
  }

}

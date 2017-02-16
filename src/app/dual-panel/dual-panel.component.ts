import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'dual-panel',
  templateUrl: './dual-panel.component.html',
  styleUrls: ['./dual-panel.component.less']
})
export class DualPanelComponent implements OnInit {
  @Input() orientation: string;
  @HostBinding('style.flexDirection') private _flexDirection: string;

  constructor() { }

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

import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {
  @HostBinding('style.flexBasis.px') public flexBasis: number;

  constructor() { }

  ngOnInit() {
  }

  setFlexBasis(flexBasis: number, containerSize: number): void {
    let newVal: number = Math.max(0, Math.min(flexBasis, containerSize));
    if (newVal === 0) newVal = 0.000001;
    this.flexBasis = newVal;
    return;
  }

}

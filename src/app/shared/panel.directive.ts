import { Directive, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[panel]'
})
export class PanelDirective implements OnInit {
  @Input('panel') _order: number;
  @Input() name: string;

  constructor() { }

  ngOnInit() {
    this._checkOrder();
  }

  private _checkOrder() {
    if (!this._order) {
      throw new Error('Panels must be numbered! Example: <div [panel]="1"></div>');
    }
  }

}

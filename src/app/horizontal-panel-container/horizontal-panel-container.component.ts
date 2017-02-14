import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'horizontal-panel-container',
  templateUrl: './horizontal-panel-container.component.html',
  styleUrls: ['./horizontal-panel-container.component.less']
})
export class HorizontalPanelContainerComponent implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}

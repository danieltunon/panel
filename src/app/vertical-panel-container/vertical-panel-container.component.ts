import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vertical-panel-container',
  templateUrl: './vertical-panel-container.component.html',
  styleUrls: ['./vertical-panel-container.component.less']
})
export class VerticalPanelContainerComponent implements OnInit {
  @Input() name: string;

  constructor() { }

  ngOnInit() {
  }

}

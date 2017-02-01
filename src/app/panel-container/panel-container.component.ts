import { Component, Input, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'panel-container',
  templateUrl: './panel-container.component.html',
  styleUrls: ['./panel-container.component.css']
})
export class PanelContainerComponent implements OnInit {
  @HostBinding('style.flexDirection') @Input() direction = 'row';
  constructor() { }

  ngOnInit() {
  }

}

import { Component, Input, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'tri-panel',
  templateUrl: './tri-panel.component.html',
  styleUrls: ['./tri-panel.component.less']
})
export class TriPanelComponent implements OnInit {
  @HostBinding('style.flexDirection') @Input() direction = 'row';

  constructor() { }

  ngOnInit() {
  }

}

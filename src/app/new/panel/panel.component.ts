import {
  Component,
  HostBinding,
  OnInit,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  ContentChildren
} from '@angular/core';
import { PanelSizingService } from '../panel-container/panel-sizing.service';
import { PanelContainerComponent } from '../panel-container/panel-container.component'

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less'],
})
export class PanelComponent implements OnInit {
  @HostBinding('style.flexBasis.px') @Input() flexBasis: number;
  // @ContentChildren(PanelContainerComponent) nestedPanelContainer;

  constructor(private el: ElementRef, private sizingService: PanelSizingService) {
    // el.nativeElement.dispatchEvent()
  }

  ngOnInit() {
  }

  setFlexBasis(flexBasis: number, /*containerSize: number*/): void {
    // let newVal: number = Math.max(0, Math.min(flexBasis, containerSize));
    // if (newVal === 0) newVal = 0.000001;
    // this.flexBasis = newVal;
    this.flexBasis = flexBasis;
    return;
  }

}

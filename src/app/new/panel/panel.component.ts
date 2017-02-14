import {
  Component,
  HostBinding,
  OnInit,
  ElementRef,
  EventEmitter,
  HostListener,
} from '@angular/core';

@Component({
  selector: 'panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.less']
})
export class PanelComponent implements OnInit {
  @HostBinding('style.flexBasis.px') public flexBasis: number;
  private requestRegisterContainer: EventEmitter<any> = new EventEmitter();
  @HostListener('requestRegisterContainer', ['$event']) private registerChildContainer(e) {
    console.log(`a panel heard this from ${e.name}`)
    this.requestRegisterContainer.emit(e);
  }

  constructor(private el: ElementRef) {
    // el.nativeElement.dispatchEvent()
  }

  ngOnInit() {
  }

  setFlexBasis(flexBasis: number, containerSize: number): void {
    let newVal: number = Math.max(0, Math.min(flexBasis, containerSize));
    if (newVal === 0) newVal = 0.000001;
    this.flexBasis = newVal;
    return;
  }

}

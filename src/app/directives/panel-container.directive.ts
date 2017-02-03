import
  { Directive,
    Input,
    HostBinding,
    ContentChildren,
    QueryList,
    ElementRef,
    AfterContentInit,
  } from '@angular/core';

import { PanelDirective } from './../directives/panel.directive';
import { PanelSizingService } from './../services/panel-sizing.service';

@Directive({
  selector: '[panel-container]',
  providers: [PanelSizingService],
  host: {
    '[style.display]': "'flex'",
    '[style.flex]': "'1 0 0'"
  }
})
export class PanelContainerDirective /*implements AfterContentInit*/ {
  @HostBinding('style.flexDirection') @Input() direction;

  get containerDimension(): number {
    return this.direction === 'row'
      ? this.el.nativeElement.clientWidth
      : this.el.nativeElement.clientHeight;
  }

  constructor(private el: ElementRef, public panelSizingService: PanelSizingService) {
    this.el = el;
  }

  ngOnInit() {
    console.log(`init size ${this.containerDimension}`)
    this.panelSizingService.setContainerDimension(this.containerDimension);
  }

  // ngAfterContentInit() {
  //   console.log(`contentinit size ${this.containerDimension}`)
    
  //   // console.log(this.el.nativeElement.clientWidth)
  //   // this.panelSizingService.printMsg();
  //   // this.panelSizes;
  //   // console.log(this.panels.map(p => p.basis))
  // }
  // ngOnChanges()           { console.log(`onChanges ${this.containerDimension}`) };
  // ngOnInit()              { console.log(`onInit ${this.containerDimension}`) };
  // ngDoCheck()             { console.log(`doCheck ${this.containerDimension}`) };
  // ngAfterContentInit()    { console.log(`afterContI ${this.containerDimension}`) };
  // ngAfterContentChecked() { console.log(`afterContCh ${this.containerDimension}`) };
  // ngAfterViewInit()       { console.log(`afterViewI ${this.containerDimension}`) };
  // ngAfterViewChecked()    { console.log(`afterViewC ${this.containerDimension}`) };
  ngAfterViewChecked()    { this.panelSizingService.log() };

}

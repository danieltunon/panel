import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  HostListener,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Subject } from 'rxjs/Subject'
// import 'rxjs/add/operator/map';

@Component({
  selector: 'dual-panel',
  templateUrl: './dual-panel.component.html',
  styleUrls: ['./dual-panel.component.less'],
})
export class DualPanelComponent implements OnInit, OnDestroy {
  @Input() direction: string = 'row';
  // @HostBinding('style.flexDirection') @Input() direction: string = 'row';
  @Input() name: string;
  @HostListener('mousemove', ['$event']) onmousemove(e: MouseEvent) {
    e.stopPropagation();
    // this.test2$.next(e);
    if (this.isResizing) this.update(e);
  }
  @HostListener('mouseup', ['$event']) onmouseup(e: MouseEvent) {
    this.isResizing = false;
  }
  @ViewChild('splitter') splitter: ElementRef;

  private test$: Subject<any> = new Subject();
  private test2$: Subject<any> = new Subject();

  private isResizing: boolean = false;
  startCoord: number;
  containerSize: number;
  firstPanelSize: number = 250;
  secondPanelSize: number = 250;


  constructor(private el: ElementRef) { }

  // Possibly use this method to set the flexbasis on the child.
  // May be better to pass the info down to the child by way of props
  private setFlexBasis(element: any, flexbasis: number, containersize: number): void {
    // take both the new flex size and the containersize to determine if the
    // flexbasis is appropriate
      // i.e. pick the larger of 0 and the smaller of the flexbasis and container

    // set style flex: 1, 1, flexbasis px

  }

  // Maybe break this out into three handlers: start, dragging, and end handlers
  // maybe good use case for observables here {type: startDrag...etc}
  private handleDrag(event: Event): void {
    console.log(event);
    // if this is a start of drag (event should contain that info?):
      // record the starting size of the container, and the two content children
      // can use getBoundingClientRect()[width/height] - size of the splitter (for the container)

    // if ongoing drag:
      // compute the distance dragged: delta (either x or y depending on direction)
      // using the recorded start size
        // setFlexBasis --> add to one content child
        // setFlexBasis --> subtract from other content child

    // notify resize up the tree (in case nested)...??
    // or maybe down... not sure depending on how props are bound
    // vs use of observables

    // if this is end of drag (event should contain that info?):
      // clear out the recorded starting size
  }

  // not sure if will need to subscribe here to anything
  // maybe if using observables
  // ngOnInit() {
  //   let size = this.direction === 'row' ? 'width' : 'column';
  //   this.containerSize = this.el.nativeElement.getBoundingClientRect()[size];
  //   this.test$.subscribe((e)=> console.log(e));
  //   this.test2$.subscribe((e)=> console.log(this.direction, e));
  // }

  // // same as init --> possibly need to unsubscribe to stuff here
  ngOnDestroy() {

  }

  // ngAfterViewInit() {
  //   setTimeout(() =>{
  //     let size = this.direction === 'row' ? 'width' : 'column';
  //     let splitterSize = this.splitter.nativeElement.getBoundingClientRect()[size];
  //     this.firstPanelSize = ~~(this.containerSize / 2);
  //     this.secondPanelSize = ~~(this.containerSize / 2);
  //   });
  // }
  // ngOnChanges()           {
  //   let size = this.direction === 'row' ? 'width' : 'height';
  //   let conts = this.el.nativeElement.getBoundingClientRect()[size];
  //   console.log(this.name, 'oc', size, conts)
  // }
  ngOnInit()              {
    let size = this.direction === 'row' ? 'width' : 'height';
    let conts = this.el.nativeElement.getBoundingClientRect()[size] -
                this.splitter.nativeElement.getBoundingClientRect()[size];
    console.log(this.name, 'oi', size, conts);
    this.firstPanelSize = ~~(conts / 2);
    this.secondPanelSize = ~~(conts / 2);
  }
  // ngDoCheck()             {
  //   let size = this.direction === 'row' ? 'width' : 'height';
  //   let conts = this.el.nativeElement.getBoundingClientRect()[size];
  //   console.log(this.name, 'dc', size, conts)
  // }
  // ngAfterContentInit()    {
  //   let size = this.direction === 'row' ? 'width' : 'height';
  //   let conts = this.el.nativeElement.getBoundingClientRect()[size];
  //   console.log(this.name, 'aci', size, conts)
  // }
  // ngAfterContentChecked() {
  //   let size = this.direction === 'row' ? 'width' : 'height';
  //   let conts = this.el.nativeElement.getBoundingClientRect()[size];
  //   console.log(this.name, 'acc', size, conts);
  //   // this.firstPanelSize = ~~(conts / 2);
  //   // this.secondPanelSize = ~~(conts / 2);
  // }
  ngAfterViewInit()       {
    let size = this.direction === 'row' ? 'width' : 'height';
    let conts = this.el.nativeElement.getBoundingClientRect()[size] -
                this.splitter.nativeElement.getBoundingClientRect()[size];
    console.log(this.name, 'avi', size, conts)
    window.setTimeout(() => {
      this.firstPanelSize = ~~(conts / 2);
      this.secondPanelSize = ~~(conts / 2);
    });

  }
  // ngAfterViewChecked()    {
  //   let size = this.direction === 'row' ? 'width' : 'height';
  //   let conts = ~~this.el.nativeElement.getBoundingClientRect()[size];
  //   console.log(this.name, 'avc', size, conts)

  // }

  update(e) {
    console.log(e);
    let currCoord = e[`client${this.direction === 'row' ? 'X' : 'Y'}`];
    this.firstPanelSize += (currCoord - this.startCoord);
    this.secondPanelSize -= (currCoord - this.startCoord);
    this.startCoord = currCoord;
  }

  startDrag(e) {
    this.isResizing = true;
    this.startCoord = e[`client${this.direction === 'row' ? 'X' : 'Y'}`];
  }

}

import {
  Component,
  OnInit,
  OnDestroy,
  HostBinding,
  Input,
} from '@angular/core';

@Component({
  selector: 'dual-panel',
  templateUrl: './dual-panel.component.html',
  styleUrls: ['./dual-panel.component.less']
})
export class DualPanelComponent implements OnInit, OnDestroy {
  @HostBinding('style.flexDirection') @Input() direction: string = 'row';

  constructor() { }

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
  ngOnInit() {
  }

  // same as init --> possibly need to unsubscribe to stuff here
  ngOnDestroy() {

  }

}

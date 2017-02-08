import { Component, OnInit, ContentChildren, QueryList, ElementRef, Renderer } from '@angular/core';
import { TriPanelComponent } from '../tri-panel/tri-panel.component';

@Component({
  selector: 'experiment',
  templateUrl: './experiment.component.html',
  styleUrls: ['./experiment.component.less']
})
export class ExperimentComponent implements OnInit {
  @ContentChildren(TriPanelComponent, { read: ElementRef }) ps: QueryList<ElementRef>;

  constructor(private el: ElementRef, private renderer: Renderer) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    let node = this.renderer.createElement(this.el.nativeElement, 'p')
    this.renderer.createText(node, 'hi there I was added by renderer');
    this.renderer.attachViewAfter(this.ps.toArray()[0].nativeElement, [node]);
  }

}

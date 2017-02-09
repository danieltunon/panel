/*
    Copyright (c) 2016-2016 OSIsoft, LLC. All rights reserved.
 
    THIS SOFTWARE CONTAINS CONFIDENTIAL INFORMATION AND TRADE SECRETS OF
    OSIsoft, LLC.  USE, DISCLOSURE, OR REPRODUCTION IS PROHIBITED WITHOUT
    THE PRIOR EXPRESS WRITTEN PERMISSION OF OSIsoft, LLC.
  
    RESTRICTED RIGHTS LEGEND
    Use, duplication, or disclosure by the Government is subject to restrictions
    as set forth in subparagraph (c)(1)(ii) of the Rights in Technical Data and
    Computer Software clause at DFARS 252.227.7013
  
    OSIsoft, LLC
    777 Davis Street, Suite 250, San Leandro CA 94577
*/

import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'icon-small-arrow',
    templateUrl: './icon-small-arrow.component.html'
})
export class IconSmallArrowComponent implements OnChanges {
    @Input() height: number = 16;
    @Input() width: number = 16;
    @Input() direction: string = 'e';
    @Input() disabled: boolean = false;
    @Input() arrowType: ArrowType = ArrowType.PanelExpander;

    private lessClass: string;

    ngOnChanges() {
        switch (this.arrowType) {
            case ArrowType.TitleBarDropdown:
                this.lessClass = 'title-bar-dropdown';
                break;
            case ArrowType.Dropdown:
                this.lessClass = 'dropdown';
                break;
            case ArrowType.TreeExpander:
                this.lessClass = 'tree-expander';
                break;
            case ArrowType.PanelExpander:
            default:
                this.lessClass = 'panel-expander';
                break;
        }
    }
}

export enum ArrowType {
    TitleBarDropdown,
    Dropdown,
    TreeExpander,
    PanelExpander
}
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PanelContainerComponent } from './old/panel-container/panel-container.component';
import { PanelComponent } from './new/panel/panel.component';
import { TriPanelComponent } from './old/tri-panel/tri-panel.component';
import { DualPanelComponent } from './old/dual-panel/dual-panel.component';
import { HorizontalPanelContainerComponent } from './new/horizontal-panel-container/horizontal-panel-container.component';
import { VerticalPanelContainerComponent } from './new/vertical-panel-container/vertical-panel-container.component';
import { SplitterComponent } from './new/splitter/splitter.component';
import { IconSmallArrowComponent } from './old/icon-small-arrow/icon-small-arrow.component'
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelContainerComponent,
    PanelComponent,
    TriPanelComponent,
    DualPanelComponent,
    HorizontalPanelContainerComponent,
    VerticalPanelContainerComponent,
    SplitterComponent,
    IconSmallArrowComponent,
    TestComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

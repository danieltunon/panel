import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { OldPanelContainerComponent } from './old/panel-container/panel-container.component';
import { PanelComponent } from './new/panel/panel.component';
import { TriPanelComponent } from './old/tri-panel/tri-panel.component';
import { DualPanelComponent } from './old/dual-panel/dual-panel.component';
import { PanelContainerComponent } from './new/panel-container/panel-container.component';
import { SplitterComponent } from './new/splitter/splitter.component';
import { IconSmallArrowComponent } from './old/icon-small-arrow/icon-small-arrow.component'
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    OldPanelContainerComponent,
    PanelComponent,
    TriPanelComponent,
    DualPanelComponent,
    PanelContainerComponent,
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PanelContainerComponent } from './panel-container/panel-container.component';
import { PanelComponent } from './panel/panel.component';
import { TriPanelComponent } from './tri-panel/tri-panel.component';
import { DualPanelComponent } from './dual-panel/dual-panel.component';
import { IconSmallArrowComponent } from './icon-small-arrow/icon-small-arrow.component'
import { TestComponent } from './test/test.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelContainerComponent,
    PanelComponent,
    TriPanelComponent,
    DualPanelComponent,
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

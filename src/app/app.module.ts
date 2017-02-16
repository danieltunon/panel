import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { TriPanelComponent } from './tri-panel/tri-panel.component';
import { DualPanelComponent } from './dual-panel/dual-panel.component';
import { IconSmallArrowComponent } from './old/icon-small-arrow/icon-small-arrow.component';
import { TestComponent } from './test/test.component';
import { PanelDirective } from './directives/panel.directive';

@NgModule({
  declarations: [
    AppComponent,
    TriPanelComponent,
    DualPanelComponent,
    IconSmallArrowComponent,
    TestComponent,
    PanelDirective,
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

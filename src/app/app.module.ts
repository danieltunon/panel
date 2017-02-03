import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { PanelDirective } from './directives/panel.directive';
import { PanelContainerDirective } from './directives/panel-container.directive';
import { TriPanelComponent } from './tri-panel/tri-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    PanelDirective,
    PanelContainerDirective,
    TriPanelComponent,
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

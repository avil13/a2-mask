import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

// Import a2 directive
import { A2MaskDirective } from './../a2/a2-mask/a2-mask.directive';

@NgModule({
  declarations: [
    AppComponent,
    A2MaskDirective // Include a2 directive
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

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CoreModule} from "./core/core.module";
import {CommonModule, LocationStrategy, PathLocationStrategy} from "@angular/common";
import {SharedModule} from "./shared/shared.module";
import {AlertService} from "./core/services/alert.service";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    CommonModule,
    SharedModule,
      ToastrModule.forRoot({
          timeOut: 2000
      }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    AlertService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

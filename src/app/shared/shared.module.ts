import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {RouterModule} from "@angular/router";
import {HeaderComponent} from "./layouts/header/header.component";
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from "@angular/material/icon";
import {MessageErrorsDirective} from "./directives/field-errors/directive/message-errors.directive";



@NgModule({
  declarations: [
      HeaderComponent,
    MessageErrorsDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatDialogModule,
    MatIconModule,

  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    HeaderComponent,
    MatDialogModule,
    MatIconModule,
    MessageErrorsDirective
  ]
})
export class SharedModule { }

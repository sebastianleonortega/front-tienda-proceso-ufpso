import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import {SharedModule} from "../../shared/shared.module";
import {HomeRoutingModule} from "./home-routing.module";
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import {MatDialogModule} from "@angular/material/dialog";



@NgModule({
  declarations: [
    HomeComponent,
    EditUserComponent,

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    SharedModule,
    HomeRoutingModule,

  ]
})
export class HomeModule { }

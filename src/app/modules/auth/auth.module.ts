import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import {AuthRoutingModule} from "./auth-routing.module";
import {SharedModule} from "../../shared/shared.module";
import { RegisterComponent } from './pages/register/register.component';



@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
      AuthRoutingModule,
      SharedModule
  ]
})
export class AuthModule { }

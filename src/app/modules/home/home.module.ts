import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import {SharedModule} from "../../shared/shared.module";
import {HomeRoutingModule} from "./home-routing.module";
import { EditUserComponent } from './pages/edit-user/edit-user.component';
import {MatDialogModule} from "@angular/material/dialog";
import { EditArticleComponent } from './pages/edit-article/edit-article.component';
import { EditCategoryComponent } from './pages/edit-category/edit-category.component';



@NgModule({
  declarations: [
    HomeComponent,
    EditUserComponent,
    EditArticleComponent,
    EditCategoryComponent,

  ],
  imports: [
    CommonModule,
    MatDialogModule,
    SharedModule,
    HomeRoutingModule,

  ]
})
export class HomeModule { }

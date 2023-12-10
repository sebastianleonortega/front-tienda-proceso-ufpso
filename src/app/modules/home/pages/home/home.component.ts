import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/service/auth.service";
import {HomeService} from "../../service/home.service";
import {AlertService} from "../../../../core/services/alert.service";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../edit-user/edit-user.component";
import {EditCategoryComponent} from "../edit-category/edit-category.component";
import {EditArticleComponent} from "../edit-article/edit-article.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token: string | null = null;
  users: any;

  viewUser: boolean = false;
  viewArticle: boolean = false;
  viewCategory: boolean = false;
  articles: any;
  categories: any;
  constructor(
    private _router: Router,
    private authService: AuthService,
    private homeService: HomeService,
    private _alert: AlertService,
    private _dialog: MatDialog,

  ) {
    this.token = localStorage.getItem('token');
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.viewUser = true;
      this.getAllUser();
      this.getAllArticle();
      this.getAllCategories();
    } else {
      this._alert.error("El token no existe")
    }
  }

  //vistas
  logout() {
    localStorage.removeItem('token');
    this._router.navigateByUrl('');
    this._alert.success("Hasta luego, vuelve pronto")
  }
  viewUserFunction(){
    this.viewUser = true;
    this.viewArticle = false;
    this.viewCategory = false;
  }
  viewCategoryFunction(){
    this.viewUser = false;
    this.viewArticle = false;
    this.viewCategory = true;

  }
  viewArticleFunction(){
    this.viewUser = false;
    this.viewArticle = true;
    this.viewCategory = false;
  }

  //users
  getAllUser(): void {
    this.homeService.getAllUser().subscribe({
      next: (data) => {
        this.users = data;
      }
    })
  }
  deleteUser(id: any){
    this.homeService.deleteUser(id).subscribe({
      next : rep =>{
        this._alert.success("Usuario eliminado")
        this.getAllUser();
      }
    })
  }

  //articles
  getAllArticle(): void {
    this.homeService.getAllArticle().subscribe({
      next: (data) => {
        this.articles = data;
      }
    })
  }
  deleteArticle(id: any){
    this.homeService.deleteArticle(id).subscribe({
      next : rep =>{
        this._alert.success("Articulo eliminado")
        this.getAllArticle();
      }
    })
  }

  //categories
  getAllCategories(): void {
    this.homeService.getAllCategories().subscribe({
      next: (data) => {
        this.categories = data;
      }
    })
  }
  deleteCategory(id: any){
    this.homeService.deleteCategory(id).subscribe({
      next : rep =>{
        this._alert.success("Categoria eliminado")
        this.getAllCategories();
      }
    })
  }




  openModalEditUser(id: any | null) {
      const idUser = id;
    const dialogRef = this._dialog.open(EditUserComponent, {
      width: '500px',
      height: '600px',
      data: idUser
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getAllUser();
    });
  }

  openModalEditArticle(id: any | null) {
    const idArticle = id;
    const dialogRef = this._dialog.open(EditArticleComponent, {
      width: '500px',
      height: '650px',
      data: idArticle
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getAllArticle();
    });
  }

  openModalEditCategory(id: any | null) {
    const idCategory= id;
    const dialogRef = this._dialog.open(EditCategoryComponent, {
      width: '500px',
      height: '600px',
      data: idCategory
    })
    dialogRef.afterClosed().subscribe(() => {
      this.getAllCategories();
    });
  }




}

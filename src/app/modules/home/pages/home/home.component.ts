import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../auth/service/auth.service";
import {HomeService} from "../../service/home.service";
import {AlertService} from "../../../../core/services/alert.service";
import {MatDialog} from "@angular/material/dialog";
import {EditUserComponent} from "../edit-user/edit-user.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token: string | null = null;
  users: any;

  viewUser: boolean = false;
  viewArticle: boolean = false
  articles: any;
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
    } else {
      this._alert.error("El token no existe")
    }

  }

  viewUserFunction(){
    this.viewUser = true;
    this.viewArticle = false;
  }
  viewArticleFunction(){
    this.viewUser = false;
    this.viewArticle = true;
  }

  getAllUser(): void {
    this.homeService.getAllUser().subscribe({
      next: (data) => {
        this.users = data;
      }
    })
  }

  delete(id: any){
    this.homeService.deleteUser(id).subscribe({
      next : rep =>{
        this._alert.success("Usuario eliminado")
        this.getAllUser();
      }
    })
  }

  getAllArticle(): void {
    this.homeService.getAllArticle().subscribe({
      next: (data) => {
        this.articles = data;
      }
    })
  }

  logout() {
    localStorage.removeItem('token');
    this._router.navigateByUrl('');
    this._alert.success("Hasta luego, vuelve pronto")
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

}

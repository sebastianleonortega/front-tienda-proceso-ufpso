import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../../auth/service/auth.service";
import {AlertService} from "../../../../core/services/alert.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {HomeService} from "../../service/home.service";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  public addUser: FormGroup = new FormGroup({});
  userUpdate: any;
    id: any;

  constructor(
    private _auth : AuthService,
    private _alert: AlertService,
    public dialog: MatDialog,
    private homeService: HomeService,
    @Inject(MAT_DIALOG_DATA) public idUser: any,


  ) { }

  ngOnInit(): void {
    this.initFormAddUser();
    if (this.idUser !== null){
        this.id = this.idUser
      this.homeService.getUserById(this.idUser).subscribe({
        next: (data) => {
          this.userUpdate = data
          this.setValueUser(data)
        }
      })

    }
  }

  setValueUser(data: any): void {
    this.addUser.get('firstName')?.setValue(data.firstName);
    this.addUser.get('email')?.setValue(data.email);
    this.addUser.get('document')?.setValue(data.document);
    this.addUser.get('lastName')?.setValue(data.lastName);
    this.addUser.get('phone')?.setValue(data.phone);
  }


  initFormAddUser(): void {
    this.addUser = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      document: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(5)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(255)]),
      phone: new FormControl('', [Validators.required, Validators.maxLength(15), Validators.minLength(10)]),
    });
  }

  onSubmit() {
    if (this.addUser.valid) {

      const data: any = {
        email: this.addUser.get('email')?.value,
        password: this.addUser.get('password')?.value,
        firstName: this.addUser.get('firstName')?.value,
        document: this.addUser.get('document')?.value,
        lastName: this.addUser.get('lastName')?.value,
        phone: this.addUser.get('phone')?.value,
      }
      this._auth.registerUser(data).subscribe({
        next: (data) =>{
          this._alert.success("Usuario registrado exitosamente");
          this.dialog.closeAll();

        }
      })
    }else{
      this._alert.warning("Debes llenar todos los campos del formulario");

    }

  }
    updateUser() {

    if (this.addUser.valid) {

      const data: any = {
        email: this.addUser.get('email')?.value,
        password: this.addUser.get('password')?.value,
        firstName: this.addUser.get('firstName')?.value,
        document: this.addUser.get('document')?.value,
        lastName: this.addUser.get('lastName')?.value,
        phone: this.addUser.get('phone')?.value,
      }
      this.homeService.updateUser(this.idUser, data).subscribe({
        next: (data) => {
          this.userUpdate = data
          this._alert.success("Usuario actualizado")
          this.dialog.closeAll();
        }
      })
    }else{
      this._alert.warning("Debes llenar todos los campos del formulario");

    }
  }

}

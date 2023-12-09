import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AlertService} from "../../../../core/services/alert.service";
import {AuthService} from "../../service/auth.service";


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public register: FormGroup = new FormGroup({});

  constructor(
      private _router: Router,
      private _alert: AlertService,
      private _auth : AuthService,
  ) { }

  ngOnInit(): void {
    this.initFormRegister();
    setTimeout(() => {
      this.rotateImage();
    }, 0);
  }

   rotateImage(): void {
    const registerImage = document.getElementById("registerImage") as HTMLElement | null;
    if (registerImage) {
      registerImage.classList.toggle("rotate");
    }
  }


  initFormRegister(): void {
    this.register = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),
      firstName: new FormControl('', [Validators.required]),
      document: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.register.valid) {

      const data: any = {
        email: this.register.get('email')?.value,
        password: this.register.get('password')?.value,
        firstName: this.register.get('firstName')?.value,
        document: this.register.get('document')?.value,
        lastName: this.register.get('lastName')?.value,
        phone: this.register.get('phone')?.value,
      }
      this._auth.registerUser(data).subscribe({
        next: (data) =>{
          this._alert.success("Usuario registrado exitosamente");
          this._router.navigateByUrl('');

        }
      })
    }

  }

  goBack() {
    this._router.navigateByUrl('');
  }


}

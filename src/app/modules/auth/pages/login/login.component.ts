import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AlertService} from "../../../../core/services/alert.service";
import {AuthService} from "../../service/auth.service";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public login: FormGroup = new FormGroup({});
  token: any;

  constructor(
      private _router: Router,
      private _alert: AlertService,
      private _auth : AuthService,
  ) { }

  ngOnInit(): void {
    this.initFormLogin();
  }

  initFormLogin(): void {
    this.login = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email, Validators.maxLength(100)]),
      password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(50)]),

    });
  }

  onSubmit() {
    if (this.login.valid) {
      const data: any = {
        email: this.login.get('email')?.value,
        password: this.login.get('password')?.value,
      };
      console.log(data)

      this._auth.login(data).subscribe({
        next: (data) => {
          this.token = data.token;
          console.log(this.token)
          localStorage.setItem('token', this.token);
          this._alert.success("Bienvenido");
          this._router.navigateByUrl('/home');
        },
        error: (error) => {
          this._alert.error('Error al iniciar sesión. Verifica tus credenciales.');
        }
      });
    }
  }


  register() {
    this._router.navigateByUrl('/register');
  }

  home() {
    this._router.navigateByUrl('/home');
  }
}

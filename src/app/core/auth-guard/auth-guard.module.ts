import {Injectable, NgModule} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {AuthService} from "../../modules/auth/service/auth.service";



@Injectable({
  providedIn: 'root',
})
export class AuthGuardModule  implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      // No autenticado, redirigir a la página de inicio de sesión
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}

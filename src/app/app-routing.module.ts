import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./core/auth-guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('.//modules/auth/auth.module').then(m => m.AuthModule),

  },
  {
    path: 'home',
    loadChildren: () => import('.//modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
  },
  {
    path: '**',
    redirectTo: '',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

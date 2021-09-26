import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthAdminGuard } from './auth-admin.guard';


import { SigninComponent } from './components/signin/signin.component';
import { AdminsComponent } from './components/admins/admins.component';
import { HomeComponent } from './components/home/home.component';
import { CasasComponent } from './components/casas/casas.component';
import { UserCasaComponent } from './components/user-casa/user-casa.component';


const routes: Routes = [
  { path: '', redirectTo: 'signin', pathMatch: 'full' },
  { path: 'signin', component: SigninComponent},
  
  { path: 'admins', component: AdminsComponent, canActivate: [AuthAdminGuard]},
  { path: 'casas', component: CasasComponent, canActivate: [AuthAdminGuard]},
  { path: 'cambio', component:UserCasaComponent, canActivate: [AuthAdminGuard]},
  
  { path: 'home', component: HomeComponent, canActivate: [AuthAdminGuard], children:[
    { path: 'admins', component: AdminsComponent, canActivate: [AuthAdminGuard]},
    { path: 'casas', component: CasasComponent, canActivate: [AuthAdminGuard]}
  ]},
  

  { path: '**', redirectTo: 'signin'},
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

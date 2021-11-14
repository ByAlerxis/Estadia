import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AdminsComponent } from './components/admins/admins.component';
import { AppRoutingModule } from './app-routing.module';
import { SigninComponent } from './components/signin/signin.component';

import { AuthAdminGuard } from './auth-admin.guard';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { CasasComponent } from './components/casas/casas.component';
import { UserCasaComponent } from './components/user-casa/user-casa.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminsComponent,
    SigninComponent,
    HomeComponent,
    CasasComponent,
    UserCasaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [AuthAdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }

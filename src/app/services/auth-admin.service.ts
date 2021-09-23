import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Admins } from '../models/admins';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {

  helper = new JwtHelperService();
  decodedToken: any;

  readonly URL = 'https://api-estadia.herokuapp.com/auth/admin';
  admin: Admins;


  constructor(private http: HttpClient, private router: Router)
  {
    this.admin = new Admins();
  }

  signUp(admin: any)
  {
    return this.http.post<any>(this.URL + '/signup', admin);
  }

  signIn(admin: any)
  {
    return this.http.post<any>(this.URL + '/signin', admin);
  }

  loggedIn()
  {
    return !!localStorage.getItem('token');
  }

  getToken()
  {
    return localStorage.getItem('token');
  }

  logOut()
  {
    localStorage.removeItem('token');
    this.router.navigate(['/signin']);
  }
}

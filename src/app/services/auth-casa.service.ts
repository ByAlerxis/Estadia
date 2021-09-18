import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Casas } from '../models/casas';


@Injectable({
  providedIn: 'root'
})
export class AuthCasaService {

  readonly URL = 'https://api-estadia.herokuapp.com/auth/casa';
  casa: Casas;

  constructor(private http: HttpClient, private router: Router)
  {
    this.casa = new Casas();
  }

  signUp(casa: any)
  {
    return this.http.post<any>(this.URL + '/signup', casa);
  }

  signIn(casa: any)
  {
    return this.http.post<any>(this.URL + '/signin', casa);
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

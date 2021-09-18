import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthCasaService } from './services/auth-casa.service';

@Injectable({
  providedIn: 'root'
})
export class AuthCasaGuard implements CanActivate {

  constructor(private authCasaService: AuthCasaService, private router: Router){}

  canActivate(): boolean{
    if(this.authCasaService.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}

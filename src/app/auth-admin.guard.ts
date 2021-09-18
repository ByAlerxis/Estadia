import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthAdminService } from './services/auth-admin.service';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminGuard implements CanActivate {

  constructor(private authAdminService: AuthAdminService, private router: Router){}

  canActivate(): boolean{
    if(this.authAdminService.loggedIn()){
      return true;
    } else {
      this.router.navigate(['/signin']);
      return false;
    }
  }
}
  


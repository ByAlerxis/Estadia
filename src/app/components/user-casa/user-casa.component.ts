import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { CasasService } from 'src/app/services/casas.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-casa',
  templateUrl: './user-casa.component.html',
  styleUrls: ['./user-casa.component.css']
})
export class UserCasaComponent implements OnInit {

  helper = new JwtHelperService();
  decodedToken: any;
  token: any;

  constructor(public authAdminService:AuthAdminService, public casasService:CasasService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.authAdminService.decodedToken = this.helper.decodeToken(this.token);
    
    if(this.authAdminService.decodedToken.rol == undefined){
     
    } else{
      this.router.navigate(['/signin']);
    }
  }

  logout(){
    this.authAdminService.logOut();
  }

}

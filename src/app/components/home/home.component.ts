import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { CasasService } from 'src/app/services/casas.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  helper = new JwtHelperService();
  decodedToken: any;
  token: any;

  constructor(public authAdminService:AuthAdminService, public casasService:CasasService, private router: Router) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    this.authAdminService.decodedToken = this.helper.decodeToken(this.token);
    
    if(this.authAdminService.decodedToken.rol == "SuperAdmin"){
      this.router.navigate(['/home/admins']);
    } else{
      this.router.navigate(['/casas']);
    }
  }

  logout(){
    this.authAdminService.logOut();
  }
  
  decodeT(){
    this.token = localStorage.getItem('token');
    this.authAdminService.decodedToken = this.helper.decodeToken(this.token);
    console.log(this.authAdminService.decodedToken.rol);
  }

}

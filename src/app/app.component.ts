import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from './services/auth-admin.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'WebEstadias';
  helper = new JwtHelperService();
  token: any;

  constructor(private authAdminService: AuthAdminService) {}

  ngOnInit(){
    this.token = localStorage.getItem('token');
    this.authAdminService.decodedToken = this.helper.decodeToken(this.token);
  }
}

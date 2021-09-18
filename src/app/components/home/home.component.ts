import { Component, OnInit } from '@angular/core';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { CasasService } from 'src/app/services/casas.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public authAdminService:AuthAdminService, public casasService:CasasService) { }

  ngOnInit(): void {
  }

  logout(){
    this.authAdminService.logOut();
  }

}

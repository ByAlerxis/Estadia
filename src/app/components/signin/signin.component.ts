import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { AuthCasaService } from 'src/app/services/auth-casa.service';

declare var M: any;

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
  providers: [AuthAdminService, AuthCasaService]
})
export class SigninComponent implements OnInit {

  constructor(private router: Router, public authAdminService: AuthAdminService, public authCasaService: AuthCasaService) { }

  ngOnInit(): void {
    if (this.authAdminService.getToken()){
      this.router.navigate(['/casas']);
    }
  }

  signin(form?: NgForm){
    if(form){
      this.authAdminService.signIn(form.value).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/home/admins']);
        },
        err => {
          M.toast({html: err.error});
        }
      )
    }

    if(form){
      this.authCasaService.signIn(form.value).subscribe(
        res => {
          localStorage.setItem('token', res.token);
          this.router.navigate(['/casas']);
        },
        err => {
          M.toast({html: err.error});
        }
      )
    }
  }

}

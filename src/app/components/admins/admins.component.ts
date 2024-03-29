import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Admins } from 'src/app/models/admins';
import { AdminsService } from 'src/app/services/admins.service';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { JwtHelperService } from '@auth0/angular-jwt';

declare var M: any;

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
  providers: [AdminsService],
})
export class AdminsComponent implements OnInit {

  helper = new JwtHelperService();
  decodedToken: any;
  token: any;
  
  constructor(
    public adminsService: AdminsService,
    public authAdminService: AuthAdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAdmins();

    
    this.token = localStorage.getItem('token');
    this.authAdminService.decodedToken = this.helper.decodeToken(this.token);
    
    if(this.authAdminService.decodedToken.rol == "SuperAdmin"){
      this.router.navigate(['/home/admins'])
    } else{
      this.router.navigate(['/casas']);
    }

  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.getAdmins();
    }
  }

  addAdmin(form?: NgForm) {
    var nombre = (<HTMLInputElement>document.getElementById('nombre')).value;
    var email = (<HTMLInputElement>document.getElementById('email')).value;
    var password = (<HTMLInputElement>document.getElementById('password'))
      .value;
    var rol = (<HTMLInputElement>document.getElementById('rol')).value;

    if (
      nombre.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      rol.length == 0
    ) {
      M.toast({ html: 'Los campos no deben estar vacios.' });
    } else {
      if (form) {
        if (form.value._id) {
          this.adminsService.putAdmins(form.value).subscribe((res) => {
            this.resetForm(form);
            M.toast({ html: 'Usuario actualizado exitosamente' });
            this.getAdmins();
          });
        } else {
          delete form.value._id;

          if (this.esEmailValido() == true) {
            (<HTMLInputElement>document.getElementById('c')).innerHTML = '';
            this.adminsService.postAdmins(form.value).subscribe((res) => {
              this.resetForm(form);
              M.toast({ html: 'Usuario guardado exitosamente' });
              this.getAdmins();
            });
          } else {
            M.toast({ html: 'El correo no es valido.' });
            (<HTMLInputElement>document.getElementById('c')).innerHTML = '* Correo invalido';
          }
        }
      }
    }
  }

  esEmailValido(): boolean {
    let correo = (<HTMLInputElement>document.getElementById('email')).value;
    let expReg =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let esValido = expReg.test(correo);
    
    if (esValido == true) {
      return true;
    } else {
      return false;
    }
  }

  getAdmins() {
    this.adminsService.getAdmins().subscribe((res) => {
      this.adminsService.admins = res as Admins[];
    });
  }

  updateAdmin(admin: Admins) {
    this.adminsService.selectedAdmin = admin;
  }

  deleteAdmin(_id: string) {
    if (confirm('Esta seguro de querer eliminar este usuario?')) {
      this.adminsService.deleteAdmins(_id).subscribe((res) => {
        this.getAdmins();
        M.toast({ html: 'Usuario eliminado exitosamente' });
        this.resetForm();
      });
    }
  }

  logout() {
    this.authAdminService.logOut();
  }

  getUsersByNameAndEmail() {
    var searchvalue = (<HTMLInputElement>document.getElementById('searchfield'))
      .value;
    if (searchvalue != '') {
      var filter = this.adminsService.admins.filter(function (value) {
        return (
          value.nombre.toUpperCase().includes(searchvalue.toUpperCase()) ||
          value.email.toUpperCase().includes(searchvalue.toUpperCase())
        );
      });
      this.adminsService.admins = filter as Admins[];
    } else {
      this.getAdmins();
    }
  }
}

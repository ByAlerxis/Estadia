import { Component, OnInit } from '@angular/core';
import { CasasService } from 'src/app/services/casas.service';
import { Casas } from 'src/app/models/casas';
import { NgForm } from '@angular/forms';
import { AuthCasaService } from 'src/app/services/auth-casa.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/auth-admin.service';

declare var M: any;

@Component({
  selector: 'app-casas',
  templateUrl: './casas.component.html',
  styleUrls: ['./casas.component.css'],
})
export class CasasComponent implements OnInit {
  helper = new JwtHelperService();
  decodedToken: any;
  token: any;

  constructor(
    public casasService: CasasService,
    public authCasaService: AuthCasaService,
    private router: Router,
    public authAdminService: AuthAdminService
  ) {}

  ngOnInit(): void {
    this.getCasas();

    this.token = localStorage.getItem('token');
    this.authAdminService.decodedToken = this.helper.decodeToken(this.token);

    if (
      this.authAdminService.decodedToken.rol == 'Admin' ||
      this.authAdminService.decodedToken.rol == 'SuperAdmin'
    ) {
    } else {
      this.router.navigate(['/singin']);
    }
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.getCasas();
    }
  }

  addCasa(form?: NgForm) {
    var nombre_negocio = (<HTMLInputElement>(
      document.getElementById('nombre_negocio')
    )).value;
    var direccion = (<HTMLInputElement>document.getElementById('direccion'))
      .value;
    var email = (<HTMLInputElement>document.getElementById('email')).value;
    var password = (<HTMLInputElement>document.getElementById('password'))
      .value;
    var telefono = (<HTMLInputElement>document.getElementById('telefono'))
      .value;
    var longitud = (<HTMLInputElement>document.getElementById('longitud'))
      .value;
    var latitud = (<HTMLInputElement>document.getElementById('latitud'))
      .value;

    if (
      nombre_negocio.length == 0 ||
      direccion.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      telefono.length == 0 ||
      telefono.length == 1 ||
      longitud.length == 0 ||
      latitud.length == 0
    ) {
      M.toast({ html: 'Los campos no deben estar vacios.' });
    } else {
      if (form) {
        if (form.value._id) {
          this.casasService.putCasa(form.value).subscribe((res) => {
            this.resetForm(form);
            M.toast({ html: 'Casa actualizado exitosamente' });
            this.getCasas();
          });
        } else {
          delete form.value._id;
          this.casasService.postCasa(form.value).subscribe((res) => {
            this.resetForm(form);
            M.toast({ html: 'Casa guardado exitosamente' });
            this.getCasas();
          });
        }
      }
    }
  }

  getCasas() {
    this.casasService.getCasas().subscribe((res) => {
      this.casasService.casas = res as Casas[];
    });
  }

  updateCasa(casa: Casas) {
    this.casasService.selectedCasa = casa;
  }

  deleteCasa(_id: string) {
    if (confirm('Esta seguro de querer eliminar esta casa?')) {
      this.casasService.deleteCasa(_id).subscribe((res) => {
        this.getCasas();
        M.toast({ html: 'Casa eliminado exitosamente' });
      });
    }
  }

  getCasasByNameAndEmail() {
    var searchvalue = (<HTMLInputElement>document.getElementById('searchfield'))
      .value;
    if (searchvalue != '') {
      var filter = this.casasService.casas.filter(function (value) {
        return (
          value.nombre_negocio
            .toUpperCase()
            .includes(searchvalue.toUpperCase()) ||
          value.email.toUpperCase().includes(searchvalue.toUpperCase())
        );
      });
      this.casasService.casas = filter as Casas[];
    } else {
      this.getCasas();
    }
  }

  logout() {
    this.authCasaService.logOut();
  }

  soloNumeros(event: any) {
    if (
      event.key == 0 ||
      event.key == 1 ||
      event.key == 2 ||
      event.key == 3 ||
      event.key == 4 ||
      event.key == 5 ||
      event.key == 6 ||
      event.key == 7 ||
      event.key == 8 ||
      event.key == 9 ||
      event.key == '.'
    ) {
      return true;
    } else {
      M.toast({ html: 'Ingresar solo numeros.' });
      return false;
    }
  }
}

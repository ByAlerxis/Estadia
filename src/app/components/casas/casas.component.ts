import { Component, OnInit } from '@angular/core';
import { CasasService } from 'src/app/services/casas.service';
import { Casas } from 'src/app/models/casas';
import { NgForm } from '@angular/forms';
import { AuthCasaService } from 'src/app/services/auth-casa.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { Loader } from '@googlemaps/js-api-loader';
import { Coords } from 'src/app/models/casas';

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
    this.iniciarMapa();
    this.getCasas();

    this.token = localStorage.getItem('token');
    this.authAdminService.decodedToken = this.helper.decodeToken(this.token);

    if (
      this.authAdminService.decodedToken.rol == 'Admin' ||
      this.authAdminService.decodedToken.rol == 'SuperAdmin'
    ) {
      this.router.navigate(['/home/casas']);
    } else {
      this.router.navigate(['/singin']);
    }
  }

  iniciarMapa() {
    let latitud = 24.03493759556703;
    let longitud = -102.35169966163187;

    let coordenadas = {
      latitud: latitud,
      longitud: longitud,
    };

    this.googleMaps(coordenadas);
  }

  googleMaps(coordenadas: Coords) {
    let loader = new Loader({
      apiKey: 'AIzaSyBs-wiWc7Kb6f2-DZj94Rti3H7ePK2CKYE',
    });

    loader.load().then(() => {
      let mapa = new google.maps.Map(
        <HTMLInputElement>document.getElementById('map'),
        {
          center: new google.maps.LatLng(
            coordenadas.latitud,
            coordenadas.longitud
          ),
          zoom: 4.7,
        }
      );

      let marcador = new google.maps.Marker({
        map: mapa,
        draggable: true,
        position: new google.maps.LatLng(
          coordenadas.latitud,
          coordenadas.longitud
        ),
      });

      marcador.addListener('dragend', function (this: any, event: any) {
        (<HTMLInputElement>document.getElementById('latitud')).value =
          this.getPosition().lat().toFixed(6);
        (<HTMLInputElement>document.getElementById('longitud')).value =
          this.getPosition().lng().toFixed(6);
      });
    });
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

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.getCasas();
      this.iniciarMapa();
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

    if (
      nombre_negocio.length == 0 ||
      direccion.length == 0 ||
      email.length == 0 ||
      password.length == 0 ||
      telefono.length == 0 ||
      telefono.length == 1
    ) {
      M.toast({ html: 'Los campos no deben estar vacios.' });
    } else {
      if (form) {
        if (form.value._id) {
          form.value.latitud = (<HTMLInputElement>(
            document.getElementById('latitud')
          )).value;
          form.value.longitud = (<HTMLInputElement>(
            document.getElementById('longitud')
          )).value;

          this.casasService.putCasa(form.value).subscribe((res) => {
            this.resetForm(form);
            M.toast({ html: 'Casa actualizado exitosamente' });
            this.getCasas();
          });
        } else {
          delete form.value._id;
          if (this.esEmailValido() == true) {
            form.value.latitud = (<HTMLInputElement>(
              document.getElementById('latitud')
            )).value;
            form.value.longitud = (<HTMLInputElement>(
              document.getElementById('longitud')
            )).value;

            let longitud = (<HTMLInputElement>(
              document.getElementById('longitud')
            )).value;
            let latitud = (<HTMLInputElement>document.getElementById('latitud'))
              .value;

            if (parseInt(longitud) == 0 || parseInt(latitud) == 0 || latitud == '' || longitud == '') {
              M.toast({ html: 'Seleccione las coordenadas en el mapa.' });
            } else {
              this.casasService.postCasa(form.value).subscribe((res) => {
                this.resetForm(form);
                M.toast({ html: 'Casa guardado exitosamente' });
                this.getCasas();
              });
            }
          } else if (this.esEmailValido() == false) {
            M.toast({ html: 'El correo no es valido.' });
          }
        }
      }
    }
  }

  focus() {
    let mapa = new google.maps.Map(
      <HTMLInputElement>document.getElementById('map'),
      {
        center: new google.maps.LatLng(
          this.casasService.selectedCasa.latitud,
          this.casasService.selectedCasa.longitud
        ),
        zoom: 16,
      }
    );

    let marcador = new google.maps.Marker({
      map: mapa,
      draggable: true,
      position: new google.maps.LatLng(
        this.casasService.selectedCasa.latitud,
        this.casasService.selectedCasa.longitud
      ),
    });

    marcador.addListener('dragend', function (this: any, event: any) {
      (<HTMLInputElement>document.getElementById('latitud')).value =
        this.getPosition().lat().toFixed(6);
      (<HTMLInputElement>document.getElementById('longitud')).value =
        this.getPosition().lng().toFixed(6);
    });
  }

  getCasas() {
    this.casasService.getCasas().subscribe((res) => {
      this.casasService.casas = res as Casas[];
    });
  }

  updateCasa(casa: Casas) {
    this.casasService.selectedCasa = casa;
    this.focus();
  }

  deleteCasa(_id: string) {
    if (confirm('Esta seguro de querer eliminar esta casa?')) {
      this.casasService.deleteCasa(_id).subscribe((res) => {
        this.getCasas();
        M.toast({ html: 'Casa eliminado exitosamente' });
        this.resetForm();
        this.iniciarMapa();
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

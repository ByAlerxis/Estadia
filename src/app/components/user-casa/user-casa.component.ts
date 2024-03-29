import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthAdminService } from 'src/app/services/auth-admin.service';
import { CasasService } from 'src/app/services/casas.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthCasaService } from 'src/app/services/auth-casa.service';
import { Casas } from 'src/app/models/casas';
import { Dollar, Dollar2 } from 'src/app/models/dollar';
import * as moment from 'moment';

declare var M: any;

@Component({
  selector: 'app-user-casa',
  templateUrl: './user-casa.component.html',
  styleUrls: ['./user-casa.component.css'],
})
export class UserCasaComponent implements OnInit {
  helper = new JwtHelperService();
  decodedToken: any;
  token: any;
  casaId: any;
  hoy: any;

  dollar: Dollar = {
    _id: 0,
    dllV: 0,
    dllC: 0,
    nombre_negocio: '',
  };

  dollar2: Dollar2 = {
    dllV: 0,
    dllC: 0,
  };

  constructor(
    public authCasaService: AuthCasaService,
    public authAdminService: AuthAdminService,
    public casasService: CasasService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.token) {
      this.casaId = this.authAdminService.decodedToken._id;
    }
    this.token = localStorage.getItem('token');
    this.authAdminService.decodedToken = this.helper.decodeToken(this.token);
    if (this.authAdminService.decodedToken.rol == undefined) {
    } else {
      this.router.navigate(['/signin']);
    }

    this.casaId = this.authAdminService.decodedToken._id;
    if (this.casaId) {
      this.casasService.getCasasById(this.casaId).subscribe(
        (res) => {
          // console.log(res);
          this.dollar = res;
        },
        (err) => console.log(err)
      );
    }

    if (this.casaId) {
      this.casasService.getCasasById(this.casaId).subscribe(
        (res) => {
          // console.log(res);
          this.dollar2 = res;
        },
        (err) => console.log(err)
      );
    }
  }

  logout() {
    this.authAdminService.logOut();
  }

  getCasaById() {
    this.casasService.getCasasById(this.casaId).subscribe((res) => {
      this.casasService.casas = res as Casas[];
    });
  }

  updateDollar() {
    // moment.locale('es');
    // this.hoy = moment().format('MMMM Do YYYY, h:mm:ss a');
    // console.log(this.hoy);

    // var car = { car: this.hoy };
    // this.dollar.historial_dolar_main = car;
    // var arr = [];
    // arr.push(this.dollar.historial_dolar_main);
    // arr.push(this.dollar.historial_dolar);
    // this.dollar.historial_dolar = arr;
    // console.log(arr);

    // this.dollar.historial_dolar_main = { historial: this.hoy };
    // let historialPar = Object.assign(this.dollar.historial_dolar, this.dollar.historial_dolar_main)
    // this.dollar.historial_dolar = historialPar;
    // console.log(this.dollar.historial_dolar);

    this.casasService.updateDollar(this.casaId, this.dollar).subscribe(
      (res) => {
        M.toast({ html: 'Precio actualizado exitosamente' });
        this.router.navigate(['/signin']);
      },
      (err) => console.error(err)
    );
  }

  convertir() {
    var valor = parseFloat(
      (<HTMLInputElement>document.getElementById('cantidad')).value
    );
    //var cantidad = (<HTMLInputElement>document.getElementById("cantidad")).value;
    var dolarCompra = parseFloat(
      (<HTMLInputElement>document.getElementById('dllC')).value
    );
    var dolarVenta = parseFloat(
      (<HTMLInputElement>document.getElementById('dllV')).value
    );
    var de = (<HTMLInputElement>document.getElementById('de')).value;
    var a = (<HTMLInputElement>document.getElementById('a')).value;
    // var accion = (<HTMLInputElement>document.getElementById('accion')).value;
    var resultadoContenedor = document.getElementById('resultado');

    if (valor == 0) {
      M.toast({
        html: 'La cantidad debe de ser mayor que cero.',
      });
    } else {
      if (de == 'peso' && a == 'dolar') {
        let resultado = (valor / dolarVenta).toFixed(2);
        resultadoContenedor!.innerHTML = 'Resultado: $' + resultado + ' ';
      }
      //DOLAR A PESO
      else if (de == 'dolar' && a == 'peso') {
        let resultado = (valor * dolarCompra).toFixed(2);
        resultadoContenedor!.innerHTML = 'Resultado: $' + resultado;
      }
      //PESO A PESO O DOLAR
      else if (de == 'peso' && a == 'peso') {
        M.toast({
          html: 'No es posible realizar esta operacion, seleccione correctamente su divisa.',
        });
      } else if (de == 'dolar' && a == 'dolar') {
        M.toast({
          html: 'No es posible realizar esta operacion, seleccione correctamente su divisa.',
        });
      }
    }
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

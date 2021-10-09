import { Injectable } from '@angular/core';
import { Casas } from '../models/casas';
import { HttpClient } from '@angular/common/http';
import { Dollar } from 'src/app/models/dollar';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class CasasService {
  selectedCasa: Casas;
  casas: Casas[];
  readonly URL_API = 'https://api-estadia.herokuapp.com/api/casas';

  constructor(private http: HttpClient) {
    this.selectedCasa = new Casas();
    this.casas = [];
  }

  getCasas() {
    return this.http.get(this.URL_API);
  }

  getCasasById(id: string) {
    return this.http.get(this.URL_API + `/${id}`);
  }
  putById(id: string, casa: Dollar){
    return this.http.put(this.URL_API + `/${id}`, casa);
  }

  postCasa(casa: Casas) {
    return this.http.post(this.URL_API, casa);
  }

  putCasa(casa: Casas) {
    return this.http.put(this.URL_API + `/${casa._id}`, casa);
  }

  deleteCasa(_id: string) {
    return this.http.delete(this.URL_API + `/${_id}`);
  }



  updateGame(_id: string|number, updatedGame: Dollar): Observable<Dollar> {
    return this.http.put(`${this.URL_API}/${_id}`, updatedGame);
  }
}

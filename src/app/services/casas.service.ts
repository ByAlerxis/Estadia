import { Injectable } from '@angular/core';
import { Casas } from '../models/casas';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CasasService {
  selectedCasa: Casas;
  casas: Casas[];
  readonly URL_API ='https://api-estadia.herokuapp.com/api/casas';

  constructor(private http: HttpClient) {
    this.selectedCasa = new Casas();
    this.casas = [];
   }

   getCasas(){
     return this.http.get(this.URL_API);
   }
   postCasa(casa: Casas){
    return this.http.post(this.URL_API, casa);
  }

  putCasa(casa: Casas){
    return this.http.put(this.URL_API + `/${casa._id}`, casa);
  }

  deleteCasa(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}

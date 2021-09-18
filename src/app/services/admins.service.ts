import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admins } from '../models/admins';


@Injectable({
  providedIn: 'root'
})
export class AdminsService {

  selectedAdmin: Admins;
  admins: Admins[];
  readonly URL_API = 'https://api-estadia.herokuapp.com/api/admins';

  constructor(private http: HttpClient) {
    this.selectedAdmin = new Admins();
    this.admins = [];
  }

  getAdmins(){
    return this.http.get(this.URL_API);
  }
  postAdmins(admin: Admins){
    return this.http.post(this.URL_API, admin);
  }

  putAdmins(admin: Admins){
    return this.http.put(this.URL_API + `/${admin._id}`, admin);
  }

  deleteAdmins(_id: string){
    return this.http.delete(this.URL_API + `/${_id}`);
  }
}

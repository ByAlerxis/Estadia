import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Admins } from 'src/app/models/admins';
import { AdminsService } from 'src/app/services/admins.service';
import { AuthAdminService } from 'src/app/services/auth-admin.service';


declare var M: any;

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css'],
  providers: [AdminsService]
})
export class AdminsComponent implements OnInit {

  constructor(public adminsService: AdminsService, public authAdminService: AuthAdminService) { }

  ngOnInit(): void {
    this.getAdmins();
  }

  resetForm(form?: NgForm) {
    if (form) {
      form.reset();
      this.getAdmins();
    }
  }

  addAdmin(form?: NgForm){
    if (form) {
      if (form.value._id) {
        this.adminsService.putAdmins(form.value).subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Usuario actualizado exitosamente' });
          this.getAdmins();
        });

      } else {
        delete form.value._id;
        this.adminsService.postAdmins(form.value).subscribe(res => {
          this.resetForm(form);
          M.toast({ html: 'Usuario guardado exitosamente' });
          this.getAdmins();
        })
      }
    }
  }

  getAdmins() {
    this.adminsService.getAdmins().subscribe(res => {
      this.adminsService.admins = res as Admins[];
      console.log(this.adminsService.admins);
    })
  }

  updateAdmin(admin: Admins) {
    this.adminsService.selectedAdmin = admin;
  }


  deleteAdmin(_id: string) {
    if (confirm('Esta seguro de querer eliminar este usuario?')) {
      this.adminsService.deleteAdmins(_id).subscribe(res => {
        this.getAdmins();
        M.toast({ html: 'Usuario eliminado exitosamente' });
      });
    }
  }

  logout(){
    this.authAdminService.logOut();
  }

  getUsersByNameAndEmail() {
    var searchvalue = (<HTMLInputElement>document.getElementById("searchfield")).value;
    if (searchvalue != '') {
      var filter = this.adminsService.admins.filter(function (value) {
        return value.nombre.toUpperCase().includes(searchvalue.toUpperCase()) ||
          value.email.toUpperCase().includes(searchvalue.toUpperCase());
      });
      this.adminsService.admins = filter as Admins[];
    } else {
      this.getAdmins();
    }

  }
}

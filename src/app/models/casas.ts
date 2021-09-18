export class Casas {
    _id: string;
    id: number;
    nombre_negocio: string;
    direccion: string;
    email: string;
    password: string;
    logo: string;
    telefono: number;

    constructor(_id = '', id = 0, nombre_negocio ='', direccion = '', 
    email = '', password = '', logo = '', telefono = 0) {
        this._id = _id;
        this.id = id;
        this.nombre_negocio = nombre_negocio;
        this.direccion = direccion;
        this.email = email;
        this.password = password;
        this.logo = logo;
        this.telefono = telefono;
    }
}

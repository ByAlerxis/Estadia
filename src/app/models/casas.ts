export class Casas {
    _id: string;
    id: number;
    nombre_negocio: string;
    direccion: string;
    email: string;
    password: string;
    logo: string;
    telefono: string;
    dllV: number;
    dllC: number;
    historial_put: string;
    latitud: number;
    longitud: number;

    constructor(_id = '', latitud = 0, longitud = 0,  id = 0, nombre_negocio ='', direccion = '', 
    email = '', password = '', logo = '', telefono = '', dllV = 0, dllC = 0, historial_put = '') {
        this._id = _id;
        this.id = id;
        this.nombre_negocio = nombre_negocio;
        this.direccion = direccion;
        this.email = email;
        this.password = password;
        this.logo = logo;
        this.telefono = telefono;
        this.dllC = dllC;
        this.dllV = dllV;
        this.historial_put = historial_put;
        this.latitud = latitud;
        this.longitud = longitud;
    }
}

export interface Coords {
    latitud: number;
    longitud: number;
}
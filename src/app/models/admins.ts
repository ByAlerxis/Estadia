export class Admins {
    _id: string;
    id: number;
    nombre: string;
    email: string;
    password: string;
    foto: string;
    rol: string;

    constructor(_id = '', id = 0, nombre = '', email = '', password = '', foto = '', rol = ''){
        this._id = _id;
        this.id = id;
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.foto = foto;
        this.rol = rol;
    }
}

export class Jugador{
    id:number;
    nombre:string;
    ganados:number;
    perdidos:number;
    habilidadEspecial:string;
    activo:boolean;
    pathImagen:string;

    constructor() {
        this.id = null;
        this.nombre = "";
        this.ganados = 0;
        this.perdidos = 0;
        this.habilidadEspecial = "";
        this.activo = true;
        this.pathImagen = null;
    }
}

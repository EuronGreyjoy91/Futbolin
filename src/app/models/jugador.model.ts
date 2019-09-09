export class Jugador{
    private nombre:string;
    private ganados:number;
    private perdidos:number;
    private goles:number;
    private habilidadEspecial:string;
    private activo:boolean;

    constructor(obj:any){
        Object.assign(this, obj);
    }
}

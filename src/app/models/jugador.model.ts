export class Jugador{

    private _nombre:string;
    private _ganados:number;
    private _perdidos:number;
    private _goles:number;
    private _activo:boolean;

    constructor(obj:any){
        Object.assign(this, obj);
    }

    get nombre():string{
        return this._nombre;
    }

    set nombre(nombre:string){
        this._nombre = nombre;
    }

    get ganados():number{
        return this._ganados;
    }

    set ganados(ganados:number){
        this._ganados = ganados;
    }

    get perdidos():number{
        return this._perdidos;
    }

    set perdidos(perdidos:number){
        this._perdidos = perdidos;
    }

    get goles():number{
        return this._goles;
    }

    set goles(goles:number){
        this._goles = goles;
    }

    get activo():boolean{
        return this._activo;
    }

    set activo(activo:boolean){
        this._activo = activo;
    }
}

import { PartidoEquipo } from './partidoEquipo.model';
import { PartidoJugador } from './partidoJugador.model';

export class Partido{
    id:number;
    fechaInicio:Date;
    fechaFin:Date;
    partidoEquipoGanador:PartidoEquipo;
    partidoJugadores:PartidoJugador[];

    constructor() {
        this.id = null;
        this.fechaInicio = new Date();
        this.partidoJugadores = [];
    }
}

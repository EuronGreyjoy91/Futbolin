import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Jugador } from '../../models/jugador.model';
import { JugadorService } from '../../services/jugador.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _jugadores:Jugador[];

  constructor(private jugadorService:JugadorService) {
      this.obtenerJugadores();
  }

  ngOnInit() {

  }

  obtenerJugadores(){

      this.jugadorService.obtenerJugadores()
        .subscribe(data => {
            this.jugadores = data;
        })

  }

  get jugadores():Jugador[]{
      return this._jugadores;
  }

  set jugadores(jugadores:Jugador[]){
      this._jugadores = jugadores;
  }

  addJugador(jugador:Jugador){
      if(this._jugadores == undefined){
          this._jugadores = [];
      }

      this._jugadores.push(jugador);
  }

}

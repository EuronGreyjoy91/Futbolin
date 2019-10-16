import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Jugador } from '../../models/jugador.model';
import { JugadorService } from '../../services/jugador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private _jugadores:Jugador[];

  constructor(private jugadorService:JugadorService, private router:Router) {
      this.obtenerJugadores();
  }

  ngOnInit() {
      this.jugadorService.jugadoresSeleccionados = [];
  }

  public obtenerJugadores(){
      this.jugadorService.obtenerJugadores()
        .subscribe(data => {
            this.jugadores = data['content'];
        })
  }

  public jugarPartido(){
      if(this.jugadorService.jugadoresSeleccionados.length < this.jugadorService.MIN_JUGADORES){
          Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: `Seleccioná al menos ${this.jugadorService.MIN_JUGADORES} jugadores`
          });
      }
      else
          this.router.navigate(["/result"]);
  }

  public addJugador(jugador:Jugador){
      if(this.jugadores == undefined){
          this.jugadores = [];
      }

      this.jugadores.push(jugador);
  }

  get jugadores():Jugador[]{
      return this._jugadores;
  }

  set jugadores(jugadores:Jugador[]){
      this._jugadores = jugadores;
  }

}

import { Component, OnInit, Input } from '@angular/core';
import { Jugador } from '../../models/jugador.model';
import { JugadorService } from '../../services/jugador.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {

  @Input() jugador:Jugador;
  @Input() index:number;

  private _seleccionado:boolean = false;

  constructor(private jugadorService:JugadorService) {
  }

  ngOnInit() {
  }

  public seleccionarJugador(jugador:Jugador){
      if(this.jugadorService.jugadoresSeleccionados.length < this.jugadorService.MAX_JUGADORES){
          this.seleccionado = true;
          this.jugadorService.jugadoresSeleccionados.push(jugador);
      }
      else{
          Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'No se pueden agregar más jugadores!'
          });
      }
  }

  public quitarJugador(jugador:Jugador){
      this.seleccionado = false;
      this.jugadorService.jugadoresSeleccionados = this.jugadorService.jugadoresSeleccionados.filter(x => x.id != jugador.id);
  }

  public borrarJugador(jugador:Jugador){
      Swal.fire({
          title: 'Confirmación',
          text: "Borrar jugador?",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, borrarlo.',
          cancelButtonText: 'Cancelar'
      }).then((result) => {
          if (result.value) {
              this.jugadorService.borrarJugador(jugador)
              .subscribe(data => {
                  location.reload();
              });
          }
      });
  }

  get seleccionado():boolean{
      return this._seleccionado;
  }

  set seleccionado(seleccionado:boolean){
      this._seleccionado = seleccionado;
  }

}

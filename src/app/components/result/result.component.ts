import { Component, OnInit } from '@angular/core';
import { Jugador } from '../../models/jugador.model';
import { Partido } from '../../models/partido.model';
import { JugadorService } from '../../services/jugador.service';
import { PartidoService } from '../../services/partido.service';
import { Router } from '@angular/router';
import { PartidoEquipo } from '../../models/partidoEquipo.model';
import { PartidoJugador } from '../../models/partidoJugador.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {

  private _interval:any;
  private _tiempo:number;
  private _tiempoDeJuego:string;

  private _partido:Partido;
  private _equipoAzul:Jugador[];
  private _equipoRojo:Jugador[];

  public EQUIPO_AZUL:number = 1;
  public EQUIPO_ROJO:number = 2;

  constructor(private jugadorService:JugadorService, private router:Router,
       private partidoService:PartidoService) {
      this.tiempo = 0;
      this.equipoAzul = [];
      this.equipoRojo = [];
      this.tiempoDeJuego = "00:00";
  }

  ngOnInit() {
     if(this.jugadorService.jugadoresSeleccionados.length > 0)
         this.generarEquipos();
     else
         this.router.navigate(["/home"]);
  }

  public generarPartido(){
      this.partido = new Partido();

      this.interval = setInterval( () => {
          this.tiempo += 1;
          this.tiempoDeJuego = this.timer(this.tiempo);
      }, 1000);
  }

  public finalizarPartido(){
      Swal.fire({
          title: '¿Finalizar partido?',
          text: "Seleccioná un equipo ganador",
          type: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: '<i class="fa fa-user" aria-hidden="true"></i> Equipo Azul',
          cancelButtonText: '<i class="fa fa-user" aria-hidden="true"></i> Equipo Rojo'
      }).then((result) => {
          if (result.value != undefined && result.value) {
            Swal.fire(
              'Partido finalizado!',
              'Equipo AZUL ganador',
              'success'
            );

            clearInterval(this.interval);
            this.guardarPartido(this.EQUIPO_AZUL);
          }
          else if(result.dismiss === Swal.DismissReason.cancel){
              Swal.fire(
                'Partido finalizado!',
                'Equipo ROJO ganador',
                'success'
              );

              clearInterval(this.interval);
              this.guardarPartido(this.EQUIPO_ROJO);
          }
      });
  }

  private guardarPartido(idEquipoGanador:number){
      //SETEAMOS LA FECHA DE FIN DEL PARTIDO
      this.partido.fechaFin = new Date();

      //SETEAMOS AL EQUIPO GANADOR
      let partidoEquipoGanador = new PartidoEquipo(idEquipoGanador, "");
      this.partido.partidoEquipoGanador = partidoEquipoGanador;

      //SETEO DE JUGADORES
      let equipoAzul = new PartidoEquipo(this.EQUIPO_AZUL, "Azul");
      let equipoRojo = new PartidoEquipo(this.EQUIPO_ROJO, "Rojo");
      this.generarPartidoJugadores(this.equipoAzul, equipoAzul, idEquipoGanador);
      this.generarPartidoJugadores(this.equipoRojo, equipoRojo, idEquipoGanador);

      this.partidoService.guardarPartido(this.partido)
      .subscribe(data => {
          if(data != null)
            this.router.navigate(["/home"]);
      });
  }

  private generarPartidoJugadores(jugadores:Jugador[], partidoEquipo:PartidoEquipo, idEquipoGanador:number){
      jugadores.forEach((jugador : Jugador, j :any)  => {
         let partidoJugador = new PartidoJugador();
         partidoJugador.jugador = jugador;
         partidoJugador.partidoEquipo = partidoEquipo;

         if(partidoJugador.partidoEquipo.id == idEquipoGanador)
            partidoJugador.jugador.ganados += 1;
         else
            partidoJugador.jugador.perdidos += 1;

         this.partido.partidoJugadores.push(partidoJugador);
      });
  }

  private generarEquipos(){
      let jugadores = this.jugadorService.jugadoresSeleccionados;
      let maximosJugadoresPorEquipo = jugadores.length == 2 ? 1 : 2;

      while(jugadores.length > 0){
          let jugador = jugadores[Math.floor(Math.random() * jugadores.length)];

          if(this.equipoAzul.length < maximosJugadoresPorEquipo)
              this.equipoAzul.push(jugador);
          else if(this.equipoRojo.length < maximosJugadoresPorEquipo)
              this.equipoRojo.push(jugador);

          jugadores = jugadores.filter(x => x.id != jugador.id);
      }
  }

  private timer(seconds:number):string {
      let sec:number = seconds % 60;
      let min:number = Math.floor(seconds / 60);

      let segundos:string;
      let minutos:string;

      if(sec.toString().length == 1)
          segundos = "0" + sec;
      else
          segundos = sec.toString();

      if(min.toString().length == 1)
          minutos = "0" + min;
      else
          minutos = min.toString();

      return minutos + ":" + segundos;
  }

  get tiempoDeJuego():string{
      return this._tiempoDeJuego;
  }

  set tiempoDeJuego(tiempoDeJuego:string){
      this._tiempoDeJuego = tiempoDeJuego;
  }

  get partido():Partido{
      return this._partido;
  }

  set partido(partido:Partido){
      this._partido = partido;
  }

  get equipoAzul():Jugador[]{
      return this._equipoAzul;
  }

  set equipoAzul(equipoAzul:Jugador[]){
      this._equipoAzul = equipoAzul;
  }

  get equipoRojo():Jugador[]{
      return this._equipoRojo;
  }

  set equipoRojo(equipoRojo:Jugador[]){
      this._equipoRojo = equipoRojo;
  }

  get interval():any{
      return this._interval;
  }

  set interval(interval:any){
      this._interval = interval;
  }

  get tiempo():number{
      return this._tiempo;
  }

  set tiempo(tiempo:number){
      this._tiempo = tiempo;
  }
}

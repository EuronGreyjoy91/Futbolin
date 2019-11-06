import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { PartidoService } from '../../services/partido.service';
import { Partido } from '../../models/partido.model';
import { Jugador } from '../../models/jugador.model';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css']
})
export class EstadisticasComponent implements OnInit {

  private _partidos:Partido[];
  private _tiempoPromedioDeJuego:number;
  public jugadores:Jugador[];

  //BARRAS
  public barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartDataSets[] = [
      { data: [], label: 'Ganados' },
      { data: [], label: 'Perdidos' }
  ];

  //TORTA
  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['Equipo rojo', 'Equipo azul'];
  public pieChartData: SingleDataSet = [0, 0];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  constructor(private partidoService:PartidoService) {
      monkeyPatchChartJsTooltip();
      monkeyPatchChartJsLegend();

      this.partidos = [];
      this.barChartLabels = [];
  }

  ngOnInit() {
      this.partidoService.obtenerPartidos()
      .subscribe((data) => {
          //console.log(data);

          //PROMEDIO DE JUEGO
          this.partidos = data['content'];
          let promedioDeJuego:number = 0;

          //TOTAL GANADOS EQUIPO ROJO Y AZUL
          let totalesPorColor:number[] = [0, 0];

          //PUNTOS POR JUGADOR
          let jugadores = new Map();

          data['content'].forEach(function(partido){
              promedioDeJuego += (new Date(partido.fechaFin).getTime() - new Date(partido.fechaInicio).getTime());

              if(partido.partidoEquipoGanador.id == 2)
                  totalesPorColor[0] = totalesPorColor[0] + 1;
              else
                  totalesPorColor[1] = totalesPorColor[1] + 1;

              partido.partidoJugadores.forEach(function(partidoJugador){
                  jugadores.set(partidoJugador.jugador.id, partidoJugador.jugador);
              });

          });

          promedioDeJuego = promedioDeJuego / data['content'].length;
          this.tiempoPromedioDeJuego = Math.floor(promedioDeJuego / 60000);

          this.pieChartData = totalesPorColor;

          let nombresJugadores = [];
          let ganados = { data: [], label: 'Ganados' };
          let perdidos = { data: [], label: 'Perdidos' };

          //JUGADORES
          jugadores.forEach(function(jugador){
              let puntos = (jugador.ganados * 2) + (jugador.perdidos);
              jugador.puntos = puntos;
              jugador.efectividad = jugador.ganados / (jugador.ganados + jugador.perdidos);

              nombresJugadores.push(jugador.nombre);

              ganados.data.push(jugador.ganados);
              perdidos.data.push(jugador.perdidos);
          });

          this.barChartLabels = nombresJugadores;
          this.barChartData = [];
          this.barChartData.push(ganados);
          this.barChartData.push(perdidos);

          this.jugadores = Array.from(jugadores.values());

          this.jugadores.sort(function(a, b){
              return (b['puntos'] - a['puntos']) + (b['efectividad'] - a['efectividad']);
          });
      });
  }

  get partidos():Partido[]{
      return this._partidos;
  }

  set partidos(partidos:Partido[]){
      this._partidos = partidos;
  }

  get tiempoPromedioDeJuego():number{
      return this._tiempoPromedioDeJuego;
  }

  set tiempoPromedioDeJuego(tiempoPromedioDeJuego:number){
      this._tiempoPromedioDeJuego = tiempoPromedioDeJuego;
  }

}

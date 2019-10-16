import { Component, OnInit, Input } from '@angular/core';
import { Jugador } from '../../models/jugador.model';

@Component({
  selector: 'app-jugador-partido',
  templateUrl: './jugador-partido.component.html',
  styleUrls: ['./jugador-partido.component.css']
})
export class JugadorPartidoComponent implements OnInit {

  @Input() jugador:Jugador;
  @Input() orientacion:string;

  constructor() { }

  ngOnInit() {
  }

}

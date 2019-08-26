import { Component, OnInit, Input } from '@angular/core';
import { Jugador } from '../../models/jugador.model';

@Component({
  selector: 'app-jugador',
  templateUrl: './jugador.component.html',
  styleUrls: ['./jugador.component.css']
})
export class JugadorComponent implements OnInit {

  @Input() jugador:Jugador;
  @Input() index:number;

  constructor() {
  }

  ngOnInit() {
  }

}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-jugador-form',
  templateUrl: './jugador-form.component.html',
  styleUrls: ['./jugador-form.component.css']
})
export class JugadorFormComponent implements OnInit {

  private formulario:FormGroup;

  constructor() { }

  ngOnInit() {

      this.formulario = new FormGroup({
          'nombre': new FormControl("", [
                                        Validators.required
                                    ]),
          'habilidadEspecial' :new FormControl("", [
                                        Validators.required
                                    ]),
      });

  }

  guardarJugador(){
      console.log(this.formulario);
  }

}

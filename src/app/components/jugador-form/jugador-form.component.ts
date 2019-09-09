import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import { JugadorService } from '../../services/jugador.service';
import { Jugador } from '../../models/jugador.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-jugador-form',
  templateUrl: './jugador-form.component.html',
  styleUrls: ['./jugador-form.component.css']
})
export class JugadorFormComponent implements OnInit {

  private _jugadorForm:FormGroup;

  constructor(private jugadorService:JugadorService, private router:Router) { }

  ngOnInit() {

      this._jugadorForm = new FormGroup({
          'nombre': new FormControl("", [
                                        Validators.required
                                    ]),
          'habilidadEspecial': new FormControl(""),
      });

  }

  guardarJugador(){
      if(this.jugadorForm.valid){

          let object:any = {
              id : null,
              nombre : this.jugadorForm.controls.nombre.value,
              habilidadEspecial : this.jugadorForm.controls.habilidadEspecial.value,
              ganados: 0,
              perdidos : 0,
              goles: 0,
              activo : true
          }

          let jugador:Jugador = new Jugador(object);
          console.log(jugador);

          /*
          Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              type: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
           }).then((result) => {
                if (result.value) {
                    Swal.fire(
                      'Deleted!',
                      'Your file has been deleted.',
                      'success'
                    )
                }
           });
           */


          this.jugadorService.saveJugador(jugador)
            .subscribe(data => {
                this.router.navigate(["/home"]);
            });

      }
  }

  get jugadorForm():FormGroup{
      return this._jugadorForm;
  }

  set jugadorForm(jugadorForm:FormGroup){
      this._jugadorForm = jugadorForm;
  }

}

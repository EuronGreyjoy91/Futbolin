import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class JugadorService {

  constructor(private httpClient:HttpClient) { }

  public obtenerJugadores(){
      return this.httpClient.get("assets/data.txt", {responseType: 'text'})
          .pipe(
              map( (resp:any) => {
                  return JSON.parse(resp).jugadores;
              })
          );
  }

}

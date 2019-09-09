import { Injectable } from '@angular/core';
import { HttpClient, HttpClientJsonpModule } from '@angular/common/http';
import { Jugador } from '../models/jugador.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class JugadorService {

  private _urlService:string = "http://localhost:8080/jugadores";

  constructor(private httpClient:HttpClient, private jsonp: HttpClientJsonpModule) { }

  public obtenerJugadores(){
      let url = `${this._urlService}/list`;
      return this.httpClient.get<Jugador[]>(url);
  }

  public saveJugador(jugador:Jugador){
      let url = `${this._urlService}/save`;
      console.log(url);
      return this.httpClient.post<Jugador>(url, jugador);
  }

  get urlService():string{
      return this.urlService;
  }

}

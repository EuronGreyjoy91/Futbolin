import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Jugador } from '../models/jugador.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JugadorService {

  private _jugadoresSeleccionados:Jugador[];
  private _urlService:string = "http://localhost:8080/api/v1";

  public MAX_JUGADORES:number = 4;
  public MIN_JUGADORES:number = 2;

  constructor(private httpClient:HttpClient) {
      this.jugadoresSeleccionados = [];
  }

  public obtenerJugadores(){
      let url = `${this.urlService}/jugadores`;
      return this.httpClient.get(url);
  }

  public saveJugador(jugador:Jugador){
      let url = `${this.urlService}/jugadores`;

      if(jugador.id != null)
          return this.httpClient.put<Jugador>(url, jugador);
      else
          return this.httpClient.post<Jugador>(url, jugador);
  }

  public uploadFile(file: File) : Observable<any>{
      let url = this.urlService + "/files";
      const formdata: FormData = new FormData();
      formdata.append('file', file);
      return this.httpClient.post(url , formdata, {responseType: 'text'});
  }

  public obtenerJugador(id:number){
      let url = `${this.urlService}/jugadores/${id}`;
      return this.httpClient.get<Jugador>(url);
  }

  public borrarJugador(jugador:Jugador){
      let url = `${this.urlService}/jugadores/status`;
      return this.httpClient.put<Jugador>(url, jugador);
  }

  get urlService():string{
      return this._urlService;
  }

  get jugadoresSeleccionados():Jugador[]{
      return this._jugadoresSeleccionados;
  }

  set jugadoresSeleccionados(jugadoresSeleccionados:Jugador[]){
      this._jugadoresSeleccionados = jugadoresSeleccionados;
  }
}

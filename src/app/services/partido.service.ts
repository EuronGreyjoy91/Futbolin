import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Partido } from '../models/partido.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PartidoService {

  constructor(private httpClient:HttpClient) { }

  private _urlService:string = "http://localhost:8080/api/v1/partidos";

  public guardarPartido(partido:Partido): Observable<any>{
      let url = `${this.urlService}`;
      return this.httpClient.post(url, partido);
  }

  public obtenerPartidos(){
      let url = `${this.urlService}`;
      return this.httpClient.get<Partido[]>(url);
  }

  get urlService():string{
      return this._urlService;
  }

}

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UnidadMedidaService {

  constructor(private _sHttp:HttpClient) { }
  getUnidadMedida():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/um`);
  }
  postUnidadMedida(objUnidadMedida): Observable<any> {
    let objUnidadMedidaString = JSON.stringify(objUnidadMedida);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/um`, objUnidadMedidaString, { headers: misHeaders });
  }
  getUnidadMedidaById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/um/${id}`);
  }
  putUnidadMedidaById(objUnidadMedida): Observable<any> {
    // en el formato {UnidadMedida:}
    let objUnidadMedidaString = JSON.stringify(objUnidadMedida);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/um`, objUnidadMedidaString, { headers: misHeaders })
  }
  deleteUnidadMedida(id):Observable<any>
  {
    return this._sHttp.delete(`${URL_BACKEND}/um/${id}`);
  }
}

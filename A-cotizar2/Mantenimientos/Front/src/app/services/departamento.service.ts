import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  constructor(private _sHttp:HttpClient) { }
  getDepartamento():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/dpto`);
  }
  postDepartamento(objDepartamento): Observable<any> {
    let objDepartamentoString = JSON.stringify(objDepartamento);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/dpto`, objDepartamentoString, { headers: misHeaders });
  }
  getDepartamentoById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/dpto/${id}`);
  }
  putDepartamentoById(objDepartamento): Observable<any> {
    let objDepartamentoString = JSON.stringify(objDepartamento);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/dpto`, objDepartamentoString, { headers: misHeaders })
  }
  deleteDepartamento(id):Observable<any>
  {
    return this._sHttp.delete(`${URL_BACKEND}/dpto/${id}`);
  }

}

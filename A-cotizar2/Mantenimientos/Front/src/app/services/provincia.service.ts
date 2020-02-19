import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private _sHttp:HttpClient) { }
  getProvincia():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/provincia`);
  }
  postProvincia(objProvincia): Observable<any> {
    let objProvinciaString = JSON.stringify(objProvincia);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/provincia`, objProvinciaString, { headers: misHeaders });
  }
  getProvinciaById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/provincia/${id}`);
  }
  putProvinciaById(objProvincia): Observable<any> {
    let objProvinciaString = JSON.stringify(objProvincia);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/provincia`, objProvinciaString, { headers: misHeaders })
  }
  deleteProvincia(id):Observable<any>
  {
    return this._sHttp.delete(`${URL_BACKEND}/provincia/${id}`);
  }

}

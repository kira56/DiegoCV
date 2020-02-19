import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class DistritoService {

  constructor(private _sHttp:HttpClient) { }
  getDistrito():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/distrito`);
  }
  postDistrito(objDistrito): Observable<any> {
    let objDistritoString = JSON.stringify(objDistrito);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/distrito`, objDistritoString, { headers: misHeaders });
  }
  getDistritoById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/distrito/${id}`);
  }
  putDistritoById(objDistrito): Observable<any> {
    let objDistritoString = JSON.stringify(objDistrito);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/distrito`, objDistritoString, { headers: misHeaders })
  }
  deleteDistrito(id):Observable<any>
  {
    return this._sHttp.delete(`${URL_BACKEND}/distrito/${id}`);
  }

}

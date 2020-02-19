import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(private _sHttp:HttpClient) { }
  getCategoria():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/categoria`);
  }
  postCategoria(objCategoria): Observable<any> {
    let objCategoriaString = JSON.stringify(objCategoria);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/categoria`, objCategoriaString, { headers: misHeaders });
  }
  getCategoriaById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/categoria/${id}`);
  }
  putCategoriaById(objCategoria): Observable<any> {
    let objCategoriaString = JSON.stringify(objCategoria);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/categoria`, objCategoriaString, { headers: misHeaders })
  }
  deleteCategoria(id):Observable<any>
  {
    return this._sHttp.delete(`${URL_BACKEND}/categoria/${id}`);
  }

}

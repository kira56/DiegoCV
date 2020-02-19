import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class SubCategoriaService {

  constructor(private _sHttp:HttpClient) { }
  getSubCategoria():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/subcategoria`);
  }
  postSubCategoria(objSubCategoria): Observable<any> {
    let objSubCategoriaString = JSON.stringify(objSubCategoria);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/subcategoria`, objSubCategoriaString, { headers: misHeaders });
  }
  getSubCategoriaById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/subcategoria/${id}`);
  }
  putSubCategoriaById(objSubCategoria): Observable<any> {
    let objSubCategoriaString = JSON.stringify(objSubCategoria);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/subcategoria`, objSubCategoriaString, { headers: misHeaders })
  }
  deleteSubCategoria(id):Observable<any>
  {
    return this._sHttp.delete(`${URL_BACKEND}/subcategoria/${id}`);
  }

}

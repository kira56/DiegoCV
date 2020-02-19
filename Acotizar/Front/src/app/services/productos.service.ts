import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private _sHttp:HttpClient) { }
  getProducto():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/producto`);
  }
  postProducto(objProducto): Observable<any> {
    console.log(objProducto);
    
    let objProductoString = JSON.stringify(objProducto);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/producto`, objProductoString, { headers: misHeaders });
  }
  getProductoById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/producto/${id}`);
  }
  putProductoById(objProducto): Observable<any> {
    let objProductoString = JSON.stringify(objProducto);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/producto`, objProductoString, { headers: misHeaders })
  }
  deleteProducto(id):Observable<any>
  {
    return this._sHttp.delete(`${URL_BACKEND}/producto/${id}`);
  }
  getProductoByIdScat(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/producto/scat/${id}`);
  }
}

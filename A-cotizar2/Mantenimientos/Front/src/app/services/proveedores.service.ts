import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class ProveedorService {

  constructor(private _sHttp:HttpClient) { }
  getProveedor():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/proveedor`);
  }
  postProveedor(objproveedor): Observable<any> {
    let objproveedorString = JSON.stringify(objproveedor);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/proveedor`, objproveedorString, { headers: misHeaders });
  }
  getProveedorById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/proveedor/${id}`);
  }
  putProveedorById(objproveedor): Observable<any> {
    let objproveedorString = JSON.stringify(objproveedor);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/proveedor`, objproveedorString, { headers: misHeaders })
  }
  deleteProveedor(id):Observable<any>
  {
    return this._sHttp.delete(`${URL_BACKEND}/proveedor/${id}`);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private _sHttp:HttpClient) { }getCliente():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/cliente`);
  }
  postCliente(objCliente): Observable<any> {
    let objClienteString = JSON.stringify(objCliente);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/cliente`, objClienteString, { headers: misHeaders });
  }
  getClienteById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/cliente/${id}`);
  }
  putClienteById(objCliente): Observable<any> {
    let objClienteString = JSON.stringify(objCliente);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/cliente`, objClienteString, { headers: misHeaders })
  }
  deleteCliente(id):Observable<any>
  {
    return this._sHttp.delete(`${URL_BACKEND}/cliente/${id}`);
  }

}

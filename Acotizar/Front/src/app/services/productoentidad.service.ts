import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class ProductoentidadService {

  constructor(private _sHttp: HttpClient) { }
  postProductoentidad(objProdEnt): Observable<any>{
      let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
      
      let objProdEntString = JSON.stringify(objProdEnt);
               
      return this._sHttp.post(`${URL_BACKEND}/prodent`, objProdEntString, { headers: misHeaders });
    }
}

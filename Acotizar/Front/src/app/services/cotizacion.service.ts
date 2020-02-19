import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  constructor(private _sHttp: HttpClient) { }
  getCotizacionByEstado(est):Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/cotizacion/estado/${est}`);
  }
  postCotizacion(objCotizacion): Observable<any> {
    let objCotizacionString = JSON.stringify(objCotizacion);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/cotdet`, objCotizacionString, { headers: misHeaders });
  }
}

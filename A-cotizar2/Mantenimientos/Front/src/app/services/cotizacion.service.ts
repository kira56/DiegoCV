import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class CotizacionService {

  constructor(private _sHttp:HttpClient) { }
  getCotizacion():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/cotizacion`);
  }
  postCotizacion(objCotizacion): Observable<any> {
    let objCotizacionString = JSON.stringify(objCotizacion);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/cotizacion`, objCotizacionString, { headers: misHeaders });
  }
  getCotizacionById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/cotizacion/${id}`);
  }
  putCotizacionById(objCotizacion): Observable<any> {
    let objCotizacionString = JSON.stringify(objCotizacion);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/cotizacion`, objCotizacionString, { headers: misHeaders })
  }
  deleteCotizacion(id):Observable<any>
  {
    return this._sHttp.delete(`${URL_BACKEND}/cotizacion/${id}`);
  }

}

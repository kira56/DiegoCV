import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CotizacionentidadService {

  constructor(private _sHttp: HttpClient) { }

  getCotizacionEntidadByEstado(estado) :Observable<any>
  {
    // console.log(idEntidad);
    
    // let objPendiente ={
    //   est: estado,
    //   ident: idEntidad
    // }
    // console.log(objPendiente);
    
    return this._sHttp.get(`${URL_BACKEND}/cotizaent/estado/${estado}`);
  }
  postCotizacionEntidad(objCotizacion): Observable<any> {
    let objCotizacionString = JSON.stringify(objCotizacion);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/cotizaent`, objCotizacionString, { headers: misHeaders });
  }
}

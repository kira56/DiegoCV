import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class CotizacionDetalleService {

  constructor(private _sHttp: HttpClient) { }
  
  postCotizacionDetalle(objCabecera, objDetalle): Observable<any>{
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    
    let objDetalleString = JSON.stringify(objDetalle);
    let objCabeceraString = JSON.stringify(objCabecera);

    let objCotiDetalle = {
      cabecera: objCabecera,
      cotizacion: objDetalle      
    }
        
    return this._sHttp.post(`${URL_BACKEND}/cotdet`, objCotiDetalle, { headers: misHeaders });
  }
  getDetalle(id):Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/cotdet/detalle/cotizacion/${id}`);
  }
}


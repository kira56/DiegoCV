import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders} from '@angular/common/http';
import { URL_BACKEND } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CotizarService {

  constructor(private _sHttp:HttpClient) { }

  getCotizar():Observable<any>{
    return this._sHttp.get(`${URL_BACKEND}/cotizacion`);
  }

  postCotizacion(objCotizacion):Observable<any> {
    let objCotizacionString = JSON.stringify(objCotizacion);
    let misHeaders = new HttpHeaders().set("Content-type","aplication/json");
    return this._sHttp.post(`${URL_BACKEND}/cotizacion`,objCotizacionString, { headers:misHeaders});
  }

  getCotizacionById(id):Observable<any>{
    return this._sHttp.get(`${URL_BACKEND}/cotizacion/${id}`);
  }

  deleteCotizacion(id):Observable<any>{
    console.log(id);
    
    return this._sHttp.delete(`${URL_BACKEND}/cotizacion/${id}`)
    
  }


}

import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';
import { isNullOrUndefined } from 'util';


@Injectable({
  providedIn: 'root'
})
export class EntidadService {

  constructor(private _sHttp: HttpClient) { }
  setIdEnt(id){
    let id_string= JSON.stringify(id);
    localStorage.setItem("idEnt", id_string);
  }
  getIdEnt(){
    let id_string = localStorage.getItem('idEnt');
    if (!isNullOrUndefined(id_string)){
      let ident = JSON.parse(id_string);
      return ident;
    } else {
      return null;
    }
  }
  getEntidadesByIdUser(identificador): Observable <any>{
    return this._sHttp.get(`${URL_BACKEND}/entidad/usuario/${identificador}`);
  }

  postEntidad(objEntidad): Observable<any> {
    let objEntidadString = JSON.stringify(objEntidad);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/entidad`, objEntidadString, { headers: misHeaders });
  }
}

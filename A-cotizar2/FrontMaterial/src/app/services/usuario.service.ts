import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  token:string;
  constructor(private _sHttp:HttpClient) { }

  getUsuario():Observable<any>
  {
    return this._sHttp.get(`${URL_BACKEND}/usuario`);
  }
  postUsuario(objUsuario): Observable<any> {
    let objUsuarioString = JSON.stringify(objUsuario);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/usuario/registrar`, objUsuarioString, { headers: misHeaders });
  }
  postProveedorUsuario(objUsuario): Observable<any> {
    let objUsuarioString = JSON.stringify(objUsuario);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/usuario/registrar2`, objUsuarioString, { headers: misHeaders });
  }
  postIniciarSesion(objLogin): Observable<any> {
    let objUsuarioString = JSON.stringify(objLogin);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/usuario/loggin`, objUsuarioString, { headers: misHeaders });
  }
  saveToken(token:string){
    localStorage.setItem("token",token);
    this.token = token;
  }
  getUsuarioById(id): Observable<any> {
    return this._sHttp.get(`${URL_BACKEND}/usuario/${id}`);
  }
  putUsuarioById(objUsuario): Observable<any> {
    let objUsuarioString = JSON.stringify(objUsuario);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.put(`${URL_BACKEND}/usuario`, objUsuarioString, { headers: misHeaders })
  }
  deleteUsuario(id):Observable<any>
  {
    console.log(id);
    
    return this._sHttp.delete(`${URL_BACKEND}/usuario/${id}`);
  }


}

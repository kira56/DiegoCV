import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_BACKEND } from 'src/environments/environment.prod';
import { Usuario } from '../models/usuario.model';
import { isNullOrUndefined } from 'util';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  constructor(private _sHttp: HttpClient) { }

  //REGISTRA USUARIO
  postUsuario(objUsuario): Observable<any> {
    let objUsuarioString = JSON.stringify(objUsuario);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/usuario`, objUsuarioString, { headers: misHeaders });
  }
  // INICIAR SESION
  postIniciarSesion(objUsuario): Observable <any>{
    let objUsuarioString = JSON.stringify(objUsuario);
    let misHeaders = new HttpHeaders().set("Content-Type", "application/json");
    return this._sHttp.post(`${URL_BACKEND}/usuario/login`, objUsuarioString, { headers: misHeaders });
  }
  setUser(user){
    let user_string= JSON.stringify(user);
    localStorage.setItem("currentUser", user_string);
  }
  setIdUser(id){
    let id_string= JSON.stringify(id);
    localStorage.setItem("idUser", id_string);
  }
  getIdUser(){
    let id_string = localStorage.getItem('idUser');
    if (!isNullOrUndefined(id_string)){
      let iduser = JSON.parse(id_string);
      return iduser;
    } else {
      return null;
    }  
  }
  getCurrentUser(){
    let user_string = localStorage.getItem('currentUser');
    if (!isNullOrUndefined(user_string)){
      let user = JSON.parse(user_string);
      return user;
    } else {
      return null;
    }
    
  }
  getUsuariosByEmail(email): Observable <any>{
    return this._sHttp.get(`${URL_BACKEND}/usuario/busqueda/${email}`);
  }
}

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UsuarioService } from 'src/app/services/usuario.service';
declare function initPlugins();
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  usuarios;
  user;
  subscripcion: Subscription;
  constructor(private _sUsuarios: UsuarioService) { }

  ngOnInit() {
    initPlugins();
    //TRAER DEL LOCALSTORAGE EL EMAIL
    this.user= this._sUsuarios.getCurrentUser();
     this.traerUsuario(this.user);
  }
  traerUsuario(email){
    this.subscripcion = this._sUsuarios.getUsuariosByEmail(email)
      .subscribe((resultado) => {
        this.usuarios = resultado;
        console.log(this.usuarios);
      });
  }

}

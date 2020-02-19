import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';
declare function initPlugins();
@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  usuarios;
  user;
  
  subscripcion: Subscription;
  objUsuario={
    usu_id:'',
    usu_email:'',
    usu_pass:'',
    usu_est:'',
    usu_tipo:'',
  }
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
        console.log("account", resultado)
        this.usuarios = resultado;
        console.log(this.usuarios.contenido[0].usu_email);
        
        this.objUsuario.usu_email = this.usuarios.contenido[0].usu_email;
        this.objUsuario.usu_est = this.usuarios.contenido[0].usu_est;
        this.objUsuario.usu_tipo = this.usuarios.contenido[0].usu_tipo;
        
        console.log("OBJETITO",this.objUsuario);
      });
  }
  ActualizarCuenta(){
    console.log();
  }

}

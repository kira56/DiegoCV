import { Component, OnInit, OnDestroy, } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { EntidadService } from '../../services/entidad.service';


declare function initPlugins();
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  usuarios;
  // recuerdame: boolean = false;
  subscripcion: Subscription;
  objUsuario = {
    usu_email: '',
    usu_pass: ''
  }
  constructor(private _sUsuarios: UsuarioService,
              private _sEntidades: EntidadService,
              private _sRouter: Router) { }
  ngOnInit() {
    initPlugins();
  }
  ngOnDestroy(){
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {
    }
  }
  ingresar(){
    console.log(this.objUsuario);
    this.subscripcion = this._sUsuarios.postIniciarSesion(this.objUsuario)
      .subscribe((rpta) => {
        console.log("RPTA",rpta);
        if (rpta.contenido.usu_tipo === 'PROVEEDOR'){
          this._sEntidades.getEntidadesByIdUser(rpta.contenido.usu_id)
          .subscribe((rpta1) =>{
            this._sEntidades.setIdEnt(rpta1.contenido[0].ent_id);
          });

        }
        this._sUsuarios.setIdUser(rpta.contenido.usu_id);
        this._sUsuarios.setUser(this.objUsuario.usu_email);
        if (rpta.token) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se Inicio Correctamente',
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            if (result.value) {
              console.log('resultados:',result.value);
            }
          });
          // ver que tipo de usuario es [ADMIN][proveedor][cliente]
          if (rpta.contenido.usu_est == 'ACTIVO'){
            switch (rpta.contenido.usu_tipo) {
              case 'ADMIN':
                console.log("ADMINISTRADOR");
                this._sRouter.navigate(['/dashboard']);
                break;
              case 'PROVEEDOR':
                this._sRouter.navigate(['/entidad']);
                console.log("PROVEEDOR");
                break;
              case 'CLIENTE':
                //CAMBIAR DE USUARIO A CLIENTE
                console.log("CLIENTE");
                this._sRouter.navigate(['/cliente']);
                break;
              default:
                break;
            }
          }else{
            // usuario esta INACTIVO
          }
        }
      }, err => {
        console.log(err)
         if(err.error.findUser === 0){
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Usuario no encontrado por favor revisar datos',
            showConfirmButton: false,
            timer: 1500
          })
          return;
        }
      });
  }

}

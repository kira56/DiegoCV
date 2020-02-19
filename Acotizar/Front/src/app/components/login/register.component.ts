import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { EntidadService } from '../../services/entidad.service';

declare function initPlugins();
declare var $: any;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit,OnDestroy {

  formulario:FormGroup;
  subscripcion: Subscription;
  constructor(private _sUsuarios: UsuarioService,
               private _sRouter: Router,
               private _sEntidad: EntidadService) { }

  sonIguales(campo1: string, campo2: string){

    return (group: FormGroup) =>{
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;
      if (pass1 === pass2){
        return null;
      }
      return{
        sonIguales: true
      };
    }
  }
  ngOnInit() {
    initPlugins();
    this.formulario = new FormGroup({
      usu_email: new FormControl( null, [Validators.required, Validators.email]),
      usu_pass: new FormControl( null, Validators.required),
      usu_pass2: new FormControl( null, Validators.required),
      campo_condiciones: new FormControl( false),
      usu_est: new FormControl(null),
      usu_tipo: new FormControl(null)
    },{ validators: this.sonIguales('usu_pass', 'usu_pass2') });
    this.formulario.setValue({
      usu_email: 'medalla@gmail.com',
      usu_pass: 'metachita',
      usu_pass2: 'metachita',
      campo_condiciones: true,
      usu_est: 'ACTIVO',
      usu_tipo: ''
    });
  }
  ngOnDestroy(){
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  CrearUsuario() {
    if (!this.formulario.value.campo_condiciones){
      Swal.fire(
        'Importante',
        'Debe Aceptar las Condiciones',
        'warning'
      );
      return;
    }
    console.log(this.formulario.value);
    //creamos los datos  a guardar en la BD
    var objUsuarioNew = new Usuario(
      this.formulario.value.usu_email,
      this.formulario.value.usu_pass,
      this.formulario.value.usu_tipo,
      this.formulario.value.usu_est
      );

      //creamos el objeto de la forma a guardar
      let objUser={
        usuario: objUsuarioNew
      }
      console.log(objUser);
      
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos registrando un Nuevo Usuario',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    this.subscripcion = this._sUsuarios.postUsuario(objUser)
      .subscribe((rpta) => {
        if (rpta.content.usu_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Se grabo Correctamente los Datos',
            showConfirmButton: false,
            timer: 1500
          }).then((result) => {
            if (result.value) {
              console.log('resultados:',result.value);
            }
          });

          ////////////////
          // para mi modelo se crea un usuario con su perfil de entidad
          ////////////////////
          if (rpta.content.usu_tipo=='PROVEEDOR'){

            this._sEntidad.postEntidad({
              ent_nom:'',
              ent_rz:'',
              ent_ruc:'',
              ent_tipo:'PJ',
              ent_pweb:'',
              ent_dir:'',
              usu_id:rpta.content.usu_id,
              dist_id:1
            })
            .subscribe((entidadCreada)=>{
              console.log(entidadCreada);
            })
          }
        }
      });
  }
}

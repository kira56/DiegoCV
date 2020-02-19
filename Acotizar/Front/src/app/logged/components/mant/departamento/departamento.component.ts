import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DepartamentoService } from 'src/app/services/departamento.service';


declare var $: any;
@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styles: []
})
export class DepartamentoComponent implements OnInit, OnDestroy {
  
  departamentos;
  subscripcion: Subscription;

  objDepartamentoNew = {
    dpto_nom: '',
  }
  objDepartamento = {
    dpto_id: '',
    dpto_nom: '',
  }
  constructor(private _sDepartamentos: DepartamentoService, 
    private _sRouter: Router) { }

  ngOnInit() {
    this.traerDepartamentos();
  }

  traerDepartamentos() {
    this.subscripcion = this._sDepartamentos.getDepartamento()
      .subscribe((resultado) => {
        this.departamentos = resultado;
      
      });
      
  }

  ngOnDestroy() {
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  CrearDepartamento() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos registrando El Departamento',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    this.subscripcion = this._sDepartamentos.postDepartamento(this.objDepartamentoNew)
      .subscribe((rpta) => {
        if (rpta.contenido.dpto_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El registro ha sido creada con éxito !',
            confirmButtonText: 'Ir a Departamento',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerDepartamentos();
            }
          })

        }
      })
    $("#modalCrear").modal("hide");
  }
  Cancelar() {
    $("#modalEditar").modal("hide");
    $("#modalCrear").modal("hide");
  }

  abrirModalEditar(id) {
    this._sDepartamentos.getDepartamentoById(id).subscribe((rpta) => {
      if (rpta.Departamento.dpto_id) {
        this.objDepartamento = rpta.Departamento;
        $("#modalEditar").modal("show");
      }
    });
  }

  AbrirModalCrearDepartamento() {
    $("#modalCrear").modal("show");
  }

  Guardar() {
    let objDPTO = {
      Departamento: this.objDepartamento
    };
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se grabo Correctamente los cambios',
      showConfirmButton: false,
      timer: 1500
    });
    this._sDepartamentos.putDepartamentoById(objDPTO).subscribe((rpta) => {
        this.traerDepartamentos();
        $("#modalEditar").modal("hide");
    });
  }


  eliminarDepartamento(id) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "los cambios seran irreversibles!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar!'
    }).then((result) => {
      if (result.value) {
        this._sDepartamentos.deleteDepartamento(id).subscribe((rpta) => {
          if (rpta.id) {
            Swal.fire(
              'Eliminado!',
              'El Registro ha sido Borrado.',
              'success'
            );
            this.traerDepartamentos();
          }
        })
      }
    })
  }
}

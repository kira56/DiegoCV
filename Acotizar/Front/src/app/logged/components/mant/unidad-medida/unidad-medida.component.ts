import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UnidadMedidaService } from '../../../../services/unidad-medida.service';


declare var $: any;
@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styles: []
})
export class UnidadMedidaComponent implements OnInit, OnDestroy{

  umedidas;
  subscripcion: Subscription;

  objUnidadMedidaNew = {
    um_nom: '',
    um_abr: ''
  }
  objUnidadMedida = {
    um_id: '',
    um_nom: '',
    um_abr: ''
  }
  constructor(private _sUnidadMedidas: UnidadMedidaService, 
              private _sRouter: Router) { }
  ngOnInit() {
    this.traerUnidadMedidas();
  }

  traerUnidadMedidas() {
    this.subscripcion = this._sUnidadMedidas.getUnidadMedida()
      .subscribe((resultado) => {
        this.umedidas = resultado;
      });
  }
  ngOnDestroy() {
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  AbrirModalCrearUnidadMedida() {
    $("#modalCrear").modal("show");
  }
  CrearUnidadMedida() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos registrando una Unidad de Medida',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    this.subscripcion = this._sUnidadMedidas.postUnidadMedida(this.objUnidadMedidaNew)
      .subscribe((rpta) => {
        if (rpta.contenido.um_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'La factura ha sido creada con éxito mafren!',
            confirmButtonText: 'Ir a UnidadMedida',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerUnidadMedidas();
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

    this._sUnidadMedidas.getUnidadMedidaById(id).subscribe((rpta) => {
      // console.timeEnd("demoreishon");
      /*   Swal.close(); */
      if (rpta.UnidadMedida.um_id) {
        // la factura existe y ya llegó
        this.objUnidadMedida = rpta.UnidadMedida;
        $("#modalEditar").modal("show");
      }
    })
  }


  Guardar() {
    let objUM2 = {
      UnidadMedida: this.objUnidadMedida
    };
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se grabo Correctamente los cambios',
      showConfirmButton: false,
      timer: 1500
    });
    this._sUnidadMedidas.putUnidadMedidaById(objUM2).subscribe((rpta) => {
      this.traerUnidadMedidas();
      $("#modalEditar").modal("hide");
    })
  }


  eliminarUnidadMedida(id) {
    Swal.fire({
      title: 'Estas Seguro?',
      text: "los cambios seran irreversibles!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Borrar'
    }).then((result) => {
      if (result.value) {
        this._sUnidadMedidas.deleteUnidadMedida(id).subscribe((rpta) => {
          console.log(rpta);

          if (rpta.id) {
            Swal.fire(
              'Eliminado!',
              'El Registro ha sido Borrado.',
              'success'
            );
            this.traerUnidadMedidas();
          }
        })
      }
    })
  }
}


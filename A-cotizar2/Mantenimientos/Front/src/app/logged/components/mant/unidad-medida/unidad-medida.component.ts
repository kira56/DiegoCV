import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UnidadMedidaService } from '../../../../services/unidadmedida.service';

declare var $: any;
@Component({
  selector: 'app-unidad-medida',
  templateUrl: './unidad-medida.component.html',
  styleUrls: ['./unidad-medida.component.css']
})
export class UnidadMedidaComponent implements OnInit ,OnDestroy {

  unidadesdemedida
  subscripcion: Subscription;

  objUnidadMedidaNew = {
    um_nom: ''
  }
  objUnidadMedida = {
    um_id: '',
    um_nom: ''
  }

  constructor(private _sUnidadMedida: UnidadMedidaService, private _sRouter: Router) { }

  
  ngOnInit() {
    this.traerUnidadMedida();
  }
  traerUnidadMedida() {
    this.subscripcion = this._sUnidadMedida.getUnidadMedida()
      .subscribe((resultado) => {
        this.unidadesdemedida = resultado;
      });
  }
  ngOnDestroy() {
    //this.subscripcion.unsubscribe();
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  CrearUnidadMedida() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando los cambios',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    this.subscripcion = this._sUnidadMedida.postUnidadMedida(this.objUnidadMedidaNew)
      .subscribe((rpta) => {
        if (rpta.contenido.um_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El SubCategoria se ha creado exitosamente!!',
            confirmButtonText: 'Ir a SubCategoria',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerUnidadMedida();
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

    this._sUnidadMedida.getUnidadMedidaById(id).subscribe((rpta) => {
      // console.timeEnd("demoreishon");
      /*   Swal.close(); */
      
      if (rpta.UnidadDeMedida.um_id) {
        // la factura existe y ya llegó
        console.log(id);
        console.log(rpta);
        this.objUnidadMedida = rpta.UnidadDeMedida;

        $("#modalEditar").modal("show");
      }
    })
  }

  AbrirModalCrearUnidadMedida() {
    $("#modalCrear").modal("show");
  }

  Guardar() {
    console.log('Unidad De Medida');
    let objUni2 = {
      UnidadDeMedida:this.objUnidadMedida
    }
    this._sUnidadMedida.putUnidadMedidaById(objUni2).subscribe((rpta) => {
      console.log(objUni2);
      if (rpta.content.um_id) {
        this.traerUnidadMedida();
        $("#modalEditar").modal("hide");
      }
    })
  }
 

  eliminarUnidadMedida(id) {
    console.log(id);

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {

        console.log("ddd");

        this._sUnidadMedida.deleteUnidadMedida(id).subscribe((rpta) => {
          console.log(rpta);

          if (rpta.id) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.traerUnidadMedida();
          }
        })
      }
    })
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CotizacionService } from '../../../../services/cotizacion.service';

declare var $: any;
@Component({
  selector: 'app-cotizacion',
  templateUrl: './cotizacion.component.html',
  styleUrls: ['./cotizacion.component.css']
})
export class CotizacionComponent implements OnInit,OnDestroy {
  cotizaciones;
  subscripcion: Subscription;

  objCotizacionNew = {
    coti_nom: '',
    coti_igv: '',
    coti_fech: '',
    coti_nro: '',
    coti_RUC: '',
  }
  objCotizacion = {
    coti_id: '',
    coti_nom: '',
    coti_igv: '',
    coti_fech: '',
    coti_nro: '',
    coti_RUC: '',
    
  }

  constructor(private _sCotizacion: CotizacionService, private _sRouter: Router) { }

  
  ngOnInit() {
    this.traerCotizacion();
  }
  traerCotizacion() {
    this.subscripcion = this._sCotizacion.getCotizacion()
      .subscribe((resultado) => {
        this.cotizaciones = resultado;
      });
  }

  ngOnDestroy() {
    //this.subscripcion.unsubscribe();
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  CrearCotizacion() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando el producto',
      allowOutsideClick: false,
      showConfirmButton: false
    })
    
    this.subscripcion = this._sCotizacion.postCotizacion(this.objCotizacionNew)
      .subscribe((rpta) => {
        console.log(rpta);
        
        if (rpta.contenido.coti_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El Cotizacion se ha creado exitosamente!!',
            confirmButtonText: 'Ir a Cotizacion',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerCotizacion();
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

    // antes de abrir el modal
    // traer la factura dado su id
    // console.time("demoreishon");
    /*  Swal.fire({
      title: 'Espere un Momento',
      text: 'El servidor procesa la informacion',
      allowOutsideClick: false,
      showConfirmButton: false
    });
 */
    this._sCotizacion.getCotizacionById(id).subscribe((rpta) => {
      // console.timeEnd("demoreishon");
      /*   Swal.close(); */
      console.log(rpta.Cotizacion.coti_id);


      if (rpta.Cotizacion.coti_id) {
        // la factura existe y ya llegó
        console.log(id);
        console.log(rpta);
        this.objCotizacion = rpta.Cotizacion;

        $("#modalEditar").modal("show");
      }
    })
  }

  AbrirModalCrearCotizacion() {
    $("#modalCrear").modal("show");
  }

  Guardar() {
    console.log('Cotizacion');
    let objCoti2 = {
      Cotizacion: this.objCotizacion
    }
    this._sCotizacion.putCotizacionById(objCoti2).subscribe((rpta) => {
      console.log(objCoti2);
      
      if (rpta.content.coti_id) {
        this.traerCotizacion();
        $("#modalEditar").modal("hide");
      }
    })
  }
 

  eliminarCotizacion(id) {
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

        this._sCotizacion.deleteCotizacion(id).subscribe((rpta) => {
          console.log(rpta);

          if (rpta.id) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.traerCotizacion();
          }
        })
      }
    })
  }
}

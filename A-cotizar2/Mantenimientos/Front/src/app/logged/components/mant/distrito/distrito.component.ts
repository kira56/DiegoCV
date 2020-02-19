import { Component, OnInit,OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router'; 
import { DistritoService } from '../../../../services/distrito.service';
import { ProvinciaService } from '../../../../services/provincia.service';
declare var $: any;
@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styleUrls: ['./distrito.component.css']
})
export class DistritoComponent implements OnInit,OnDestroy {

  

  distritos;
  provincias;
  subscripcion: Subscription;

  objDistritoNew = {
    dist_nom: '',
    pro_id:''
  }
  objDistrito = {
    dist_id: '',
    dist_nom: '',
    pro_id:'',
  
  }

  constructor(private _sDistrito:DistritoService,private _sProvincias:ProvinciaService,private _sRouter: Router) { }

  ngOnInit() {
    this.traerDistrito();
  }
  traerDistrito() {
    this.subscripcion = this._sDistrito.getDistrito()
      .subscribe((resultado) => {
        this.distritos = resultado;
        console.log(this.distritos);
        
      });
  }

  traerProvincia() {
    this.subscripcion = this._sProvincias.getProvincia()
      .subscribe((resultado) => {
        this.provincias = resultado.contenido;
        console.log(this.provincias);
        
      });
  }
  ngOnDestroy() {
    //this.subscripcion.unsubscribe();
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  CrearDistrito() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando los datos',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    this.subscripcion = this._sDistrito.postDistrito(this.objDistritoNew)
      .subscribe((rpta) => {
        if (rpta.contenido.dist_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El Distrito se ha creado exitosamente!!',
            confirmButtonText: 'Ir a Distrito',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerDistrito();
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
    this._sDistrito.getDistritoById(id).subscribe((rpta) => {
      // console.timeEnd("demoreishon");
      /*   Swal.close(); */
      console.log(rpta.Distrito.dist_id);


      if (rpta.Distrito.dist_id) {
        // la factura existe y ya llegó
        console.log(id);
        console.log(rpta);
        this.objDistrito = rpta.Distrito;

        $("#modalEditar").modal("show");
      }
    })
  }

  AbrirModalCrearDistrito() {
    $("#modalCrear").modal("show");
    this.traerProvincia();
  }

  Guardar() {
    console.log('Distrito');
    let objDist = {
      Distrito: this.objDistrito
    }
    this._sDistrito.putDistritoById(objDist).subscribe((rpta) => {
      console.log(objDist);
      if (rpta.content.dist_id) {
        this.traerDistrito();
        $("#modalEditar").modal("hide");
      }
    })
  }
 

  eliminarDistrito(id) {
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

        this._sDistrito.deleteDistrito(id).subscribe((rpta) => {
          console.log(rpta);

          if (rpta.id) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.traerDistrito();
          }
        })
      }
    })
  }
}

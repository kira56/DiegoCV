import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriaService } from '../../../../services/categoria.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
declare var $: any;
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit, OnDestroy {


  categorias;
  subscripcion: Subscription;

  objCategoriaNew = {
    cat_nom: '',
  }
  objCategoria = {
    cat_id: '',
    cat_nom: '',
  }
  constructor(private _sCategorias: CategoriaService, 
    private _sRouter: Router) { }

  ngOnInit() {
    this.traerCategorias();
  }

  traerCategorias() {
    this.subscripcion = this._sCategorias.getCategoria()
      .subscribe((resultado) => {
        this.categorias = resultado;
        console.log(this.categorias);
        
      });
      
  }

  ngOnDestroy() {
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  CrearCategoria() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos registrando La Categoria',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    this.subscripcion = this._sCategorias.postCategoria(this.objCategoriaNew)
      .subscribe((rpta) => {
        if (rpta.contenido.cat_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El registro ha sido creada con éxito !',
            confirmButtonText: 'Ir a Categoria',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerCategorias();
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
    this._sCategorias.getCategoriaById(id).subscribe((rpta) => {
      if (rpta.Categoria.cat_id) {
        this.objCategoria = rpta.Categoria;
        $("#modalEditar").modal("show");
      }
    });
  }

  AbrirModalCrearCategoria() {
    $("#modalCrear").modal("show");
  }

  Guardar() {
    let objCat = {
      Categoria: this.objCategoria
    };
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se grabo Correctamente los cambios',
      showConfirmButton: false,
      timer: 1500
    });
    this._sCategorias.putCategoriaById(objCat).subscribe((rpta) => {
        this.traerCategorias();
        $("#modalEditar").modal("hide");
    });
  }


  eliminarCategoria(id) {
    console.log(id);

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
        this._sCategorias.deleteCategoria(id).subscribe((rpta) => {
          if (rpta.id) {
            Swal.fire(
              'Eliminado!',
              'El Registro ha sido Borrado.',
              'success'
            );
            this.traerCategorias();
          }
        })
      }
    })
  }
}


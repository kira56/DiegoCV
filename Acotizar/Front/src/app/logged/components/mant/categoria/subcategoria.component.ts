import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CategoriaService } from 'src/app/services/categoria.service';
declare var $: any;
@Component({
  selector: 'app-subcategoria',
  templateUrl: './subcategoria.component.html',
  styles: []
})
export class SubcategoriaComponent implements OnInit, OnDestroy {

  subcategorias;
  categorias;
  subscripcion: Subscription;

  objSubCategoriaNew = {
    scat_nom: '',
    cat_id: ''
  };
  objSubCategoria = {
    scat_id: '',
    scat_nom: '',
    cat_id: ''
  };

  constructor(private _sCategorias: CategoriaService,
              private _sSubCategorias: SubcategoriaService,
              private _sRouter: Router,
              ) { }

  ngOnInit() {
    this.traerCategorias();
    this.traerSubCategorias();
  }

  traerCategorias(){
    this.subscripcion = this._sCategorias.getCategoria()
      .subscribe((resultado) => {
        this.categorias = Object.values(resultado.contenido);
        console.log(this.categorias);
    });
  }
  ngOnDestroy() {
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  traerSubCategorias(){
    this.subscripcion = this._sSubCategorias.getSubCategoria()
      .subscribe((resultado) => {
        this.subcategorias = resultado;
    });
  }
  CrearSubCategoria() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos registrando La SubCategoria',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    this.subscripcion = this._sSubCategorias.postSubCategoria(this.objSubCategoriaNew)
      .subscribe((rpta) => {
        if (rpta.contenido.scat_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El registro ha sido creada con éxito !',
            confirmButtonText: 'Ir a Categoria',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerSubCategorias();
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
    this._sSubCategorias.getSubCategoriaById(id).subscribe((rpta) => {
      if (rpta.SubCategoria.scat_id) {
        this.objSubCategoria = rpta.SubCategoria;
        $("#modalEditar").modal("show");
      }
    });
  }

  AbrirModalCrearSubCategoria() {
    $("#modalCrear").modal("show");
  }

  Guardar() {
    let objSCat = {
      SubCategoria: this.objSubCategoria
    };
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se grabo Correctamente los cambios',
      showConfirmButton: false,
      timer: 1500
    });
    this._sSubCategorias.putSubCategoriaById(objSCat).subscribe((rpta) => {
        this.traerSubCategorias();
        $("#modalEditar").modal("hide");
    });
  }


  eliminarSubCategoria(id) {
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
        this._sSubCategorias.deleteSubCategoria(id).subscribe((rpta) => {
          if (rpta.id) {
            Swal.fire(
              'Eliminado!',
              'El Registro ha sido Borrado.',
              'success'
            );
            this.traerSubCategorias();
          }
        })
      }
    })
  }
}

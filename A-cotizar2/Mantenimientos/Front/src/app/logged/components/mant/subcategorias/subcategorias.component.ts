import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubCategoriaService } from '../../../../services/subcategoria.service';
import { CategoriaService } from '../../../../services/categoria.service';

declare var $: any;
@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css']
})
export class SubcategoriasComponent implements OnInit {
  subcategorias;
  categorias;
  subscripcion: Subscription;

  objSubCategoriaNew = {
    subc_nom: '',
    cat_id:''
  }
  objSubCategoria = {
    subc_id: '',
    subc_nom: '',
    cat_id:''
  }

  constructor(private _sSubCategorias: SubCategoriaService,private _sCategorias:CategoriaService, private _sRouter: Router) { }

  
  ngOnInit() {
    this.traerSubCategorias();
  }
  traerSubCategorias() {
    this.subscripcion = this._sSubCategorias.getSubCategoria()
      .subscribe((resultado) => {
        this.subcategorias = resultado;
      });
  }
  traerCategorias()
  {
    this.subscripcion = this._sCategorias.getCategoria()
      .subscribe((resultado) => {
        this.categorias = Object.values(resultado.contenido);
        console.log(this.categorias);
      });
  }
  ngOnDestroy() {
    //this.subscripcion.unsubscribe();
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  CrearSubCategoria() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando los cambios',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    this.subscripcion = this._sSubCategorias.postSubCategoria(this.objSubCategoriaNew)
      .subscribe((rpta) => {
        if (rpta.contenido.subc_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El SubCategoria se ha creado exitosamente!!',
            confirmButtonText: 'Ir a SubCategoria',
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
      // console.timeEnd("demoreishon");
      /*   Swal.close(); */
      console.log(rpta.SubCategoria.subc_id);


      if (rpta.SubCategoria.subc_id) {
        // la factura existe y ya llegó
        console.log(id);
        console.log(rpta);
        this.objSubCategoria = rpta.SubCategoria;

        $("#modalEditar").modal("show");
      }
    })
  }

  AbrirModalCrearSubCategoria() {
    $("#modalCrear").modal("show");
    this.traerCategorias();
  }

  Guardar() {
    console.log('SubCategoria');
    let objCat2 = {
      SubCategoria: this.objSubCategoria
    }
    this._sSubCategorias.putSubCategoriaById(objCat2).subscribe((rpta) => {
      console.log(objCat2);
      if (rpta.content.subc_id) {
        this.traerSubCategorias();
        $("#modalEditar").modal("hide");
      }
    })
  }
 

  eliminarSubCategoria(id) {
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

        this._sSubCategorias.deleteSubCategoria(id).subscribe((rpta) => {
          console.log(rpta);

          if (rpta.id) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.traerSubCategorias();
          }
        })
      }
    })
  }
}

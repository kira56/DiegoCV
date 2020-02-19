import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProductosService } from '../../../../services/productos.service';
import { CategoriaService } from '../../../../services/categoria.service';
import { SubcategoriaService } from '../../../../services/subcategoria.service';

declare var $: any;
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: []
})
export class ProductoComponent implements OnInit , OnDestroy {

  productos;
  categorias;
  subcategorias;
  subscripcion: Subscription;
  

  objProductoNew = {
    prod_nomb: '',
    scat_id: ''
  }
  objProducto = {
    prod_id: '',
    prod_nomb: '',
    scat_id: ''
  }
  constructor(private _sProductos: ProductosService,
              private _sCategorias: CategoriaService,
              private _sSubCategorias: SubcategoriaService,
              private _sRouter: Router) { }

  ngOnInit() {
    this.traerProductos();
  }

  selectedSCat: any;
  getSelectedSCat(){
    console.log("Categoria ID",this.selectedSCat);
    this.traerSubCategorias(this.selectedSCat);
    
    
  }
  traerProductos(){
    this.subscripcion = this._sProductos.getProducto()
    .subscribe((resultado)=>{
      this.productos = resultado;
    });
  }
  traerCategorias(){
    this.subscripcion = this._sCategorias.getCategoria()
    .subscribe((resultado)=>{
      this.categorias = Object.values(resultado.contenido);
    });
  }
  traerSubCategorias(id){
    this.subscripcion = this._sSubCategorias.getSCategoriasByIdCat(id)
    .subscribe((resultado)=>{
      this.subcategorias = Object.values(resultado.content);
    });
  }
  ngOnDestroy(){
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  AbrirModalCrearProducto() {
    $("#modalCrear").modal("show");
    this.traerCategorias();
  }
  CrearProducto() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos registrando La Producto',
      allowOutsideClick: false,
      showConfirmButton: false
    });
    console.log(this.objProductoNew);
    
    this.subscripcion = this._sProductos.postProducto(this.objProductoNew)
      .subscribe((rpta) => {
        console.log("RESPUESTA:",rpta);
        
        if (rpta.contenido.prod_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El registro ha sido creada con éxito !',
            confirmButtonText: 'Ir a Producto',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerProductos();
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
  /////////////////////
  abrirModalEditar(id) {
    this._sProductos.getProductoById(id).subscribe((rpta) => {
      if (rpta.Producto.prod_id) {
        this.objProducto = rpta.Producto;
        $("#modalEditar").modal("show");
      }
    });
  }
  Guardar() {
    let objProd = {
      Producto: this.objProducto
    };
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Se grabo Correctamente los cambios',
      showConfirmButton: false,
      timer: 1500
    });
    this._sProductos.putProductoById(objProd).subscribe((rpta) => {
        this.traerProductos();
        $("#modalEditar").modal("hide");
    });
  }
  eliminarProducto(id) {
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
        this._sProductos.deleteProducto(id).subscribe((rpta) => {
          if (rpta.id) {
            Swal.fire(
              'Eliminado!',
              'El Registro ha sido Borrado.',
              'success'
            );
            this.traerProductos();
          }
        })
      }
    })
  }
}

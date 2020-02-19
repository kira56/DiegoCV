import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProveedorService } from '../../../../services/proveedores.service';
import { UsuarioService } from '../../../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CategoriaService } from '../../../../services/categoria.service';

declare var $: any;
@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styleUrls: ['./proveedor.component.css']
})
export class ProveedorComponent implements OnInit,OnDestroy {
  proveedores;
  usuarios;
  categorias;
  subscripcion: Subscription;

  objNewUsuario = {
    usu_email: '',
    usu_pass: '',
    usu_est: '',
    usu_tipo: 'proveedor'
  }


  objProveedorNew = {
    prov_rz: '',
    prov_RUC: '',
    prov_pweb: '',
    prov_dir:'',
  }
  objProveedor = {
    prov_id: '',
    prov_rz: '',
    prov_RUC: '',
    prov_pweb: '',
    prov_dir:'',
    cat_id:''
  }
  provcat = {
    cat_id:''
  }
  constructor(private _sUsuarios: UsuarioService,private _sProveedor: ProveedorService, private _sCategorias:CategoriaService,private _sRouter: Router) { }

  
  ngOnInit() {
    this.traerProveedores();
    this.traerUsuarios();
  }
  traerProveedores() {
    this.subscripcion = this._sProveedor.getProveedor()
      .subscribe((resultado) => {
        this.proveedores = resultado;
      });
  }
  traerUsuarios() {
    this.subscripcion = this._sUsuarios.getUsuario().subscribe((resultado: any) => {
      this.usuarios = resultado;
      console.log(resultado.contenido);
      console.log(this.usuarios);
    })
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
  CrearProveedor() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando el producto',
      allowOutsideClick: false,
      showConfirmButton: false
    })
  console.log("se ejecuto");
  
    let objUnion = {
      usuario: this.objNewUsuario,
      proveedor: this.objProveedorNew,
      provcat:this.provcat
    }
    this.subscripcion = this._sUsuarios.postProveedorUsuario(objUnion)
      .subscribe((rpta) => {
        console.log("usu");
        
        console.log(rpta.content);
        
        if (rpta.content.usu_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El Proveedor se ha creado exitosamente!!',
            confirmButtonText: 'Ir a Proveedor',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerProveedores();
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
    this._sProveedor.getProveedorById(id).subscribe((rpta) => {
      // console.timeEnd("demoreishon");
      /*   Swal.close(); */


      if (rpta.Proveedor.prov_id) {
        // la factura existe y ya llegó
        console.log(id);
        console.log(rpta);
        this.objProveedor = rpta.Proveedor;

        $("#modalEditar").modal("show");
      }
    })
  }

  AbrirModalCrearProveedor() {
    $("#modalCrear").modal("show");
    this.traerCategorias();
  }

  Guardar() {
    console.log('Proveedor');
    let objProv2 = {
      Proveedor: this.objProveedor
    }
    this._sProveedor.putProveedorById(objProv2).subscribe((rpta) => {
      console.log(objProv2);
      if (rpta.content.prov_id) {
        this.traerProveedores();
        $("#modalEditar").modal("hide");
      }
    })
  }
 

  eliminarProveedor(id) {
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

        this._sProveedor.deleteProveedor(id).subscribe((rpta) => {
          console.log(rpta);

          if (rpta.id) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.traerProveedores();
          }
        })
      }
    })
  }
}

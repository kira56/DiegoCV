import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2'
import { UsuarioService } from '../../../../services/usuario.service';
import { Router } from '@angular/router';
import { ClienteService } from '../../../../services/cliente.service';
import { ProveedorService } from '../../../../services/proveedores.service';
import { DistritoService } from '../../../../services/distrito.service';


declare var $: any;
@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit, OnDestroy {

  usuarios;
  clientes;
  distritos;
  proveedores;
  subscripcion: Subscription;

  objNewUsuario = {
    usu_email: '',
    usu_pass: '',
    usu_est: '',
    usu_tipo: 'cliente',
    dist_id:''

  }
  objcliente =
    {
      cli_ndoc: '',
      cli_nom: '',
      cli_ape: '',
      cli_tel: '',
      cli_dire: ''
    }
  objUsuario = {
    usu_id: '',
    usu_email: '',
    usu_hash: '',
    usu_est: '',
    usu_tipo: ''
  }
  objProveedor = {
    prov_rz: '',
    prov_RUC: '',
    prov_pweb: '',
    prov_dir: '',
    cat_id: '',
    dist_id: ''
  }
  constructor(private _sUsuarios: UsuarioService, private _sClientes: ClienteService,private _sDistrito:DistritoService, private _sProveedores: ProveedorService, private _sRouter: Router) { }

  ngOnInit() {
    this.traerUsuarios();
    this.traerCliente();
    this.traerProveedor();
    this.traerDistritos();
  }
  ngOnDestroy() {
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  traerUsuarios() {
      this.subscripcion = this._sUsuarios.getUsuario().subscribe((resultado: any) => {
        this.usuarios = resultado;
        console.log(resultado.contenido);
        console.log(this.usuarios);
      })
  }
  traerCliente() {
    this.subscripcion = this._sClientes.getCliente().subscribe((resultado: any) => {
      this.clientes = resultado;
    })

  }
  traerProveedor() {
    this.subscripcion = this._sProveedores.getProveedor().subscribe((resultado: any) => {
      this.proveedores = resultado;
    })

  }
  traerDistritos() {
    this.subscripcion = this._sDistrito.getDistrito().subscribe((resultado: any) => {
      console.log(resultado);
      
      this.distritos = resultado.content;
    })

  }

  crearUsuarioYCliente() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando el Usuario',
      allowOutsideClick: false,
      showConfirmButton: false
    })
    let objUnion = {
      usuario: this.objNewUsuario,
      cliente: this.objcliente
    }
    console.log(
      objUnion
    );

    this.subscripcion = this._sUsuarios.postUsuario(objUnion)
      .subscribe((rpta) => {

        if (rpta.content.usu_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El Usuario se ha creado exitosamente!',
            confirmButtonText: 'Ir a Usuario',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerUsuarios();
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
    this._sUsuarios.getUsuarioById(id).subscribe((rpta) => {
      console.log(rpta.Usuario.prod_id);


      if (rpta.Usuario.usu_id) {
        this.objUsuario = rpta.Usuario;

        $("#modalEditar").modal("show");
      }
    })
  }
  AbrirModalCrearUsuario() {
    $("#modalCrear").modal("show");
    this.objNewUsuario;
  }

  Guardar() {
    let objPro2 = {
      Usuario: this.objUsuario
    }
    this._sUsuarios.putUsuarioById(objPro2).subscribe((rpta) => {
      console.log(objPro2);
      if (rpta.content.usu_id) {
        this.traerUsuarios();
        $("#modalEditar").modal("hide");
      }
    })
  }
  crearUsuarioYProveedor() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando el Usuario',
      allowOutsideClick: false,
      showConfirmButton: false
    })
    let objUnion = {
      usuario: this.objNewUsuario,
      proveedor: this.objProveedor
    }
    console.log(
      objUnion
    );

    this.subscripcion = this._sUsuarios.postUsuario(objUnion)
      .subscribe((rpta) => {
        console.log(rpta.content.proveedorCreado.prov.id);

        if (rpta.content.prov_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El Usuario se ha creado exitosamente!',
            confirmButtonText: 'Ir a Usuario',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerUsuarios();
              this.traerCliente();
              this.traerProveedor();
            }
          })

        }
      })
    $("#modalCrear").modal("hide");
  }
  eliminarUsuario(id) {
    console.log(id);

    Swal.fire({
      title: 'Estas Seguro?',
      text: "No hay vuelta atras!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminalo!'
    }).then((result) => {
      if (result.value) {

        console.log("ddd");
        console.log(id);

        this._sUsuarios.deleteUsuario(id).subscribe((rpta) => {
          console.log(rpta);

          if (rpta.id) {
            Swal.fire(
              'Eliminado!',
              'Ha sido eliminado.',
              'success'
            );
            this.traerUsuarios();
          }
        })
      }
    })
  }

}

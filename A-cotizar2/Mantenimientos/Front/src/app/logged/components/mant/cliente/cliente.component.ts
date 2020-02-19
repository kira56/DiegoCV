import { Component, OnInit, OnDestroy } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClienteService } from '../../../../services/cliente.service';
import { UsuarioService } from '../../../../services/usuario.service';

declare var $: any;

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit, OnDestroy {
  clientes;
  usuarios;
  subscripcion: Subscription;

  objNewUsuario = {
    usu_email: '',
    usu_pass: '',
    usu_est: '',
    usu_tipo: 'cliente',
    
  }


  objClienteNew = {
    cli_ndoc: '',
    cli_nom: '',
    cli_ape: '',
    cli_tel: '',
    cli_dire: ''
  }
  objCliente = {
    cli_id: '',
    cli_ndoc: '',
    cli_nom: '',
    cli_ape: '',
    cli_tel: '',
    cli_dire: ''
  }


  constructor(private _sUsuarios: UsuarioService, private _sCliente: ClienteService, private _sRouter: Router) { }


  ngOnInit() {
    this.traerCliente();
    this.traerUsuarios();
  }
  traerCliente() {
    this.subscripcion = this._sCliente.getCliente()
      .subscribe((resultado) => {
        this.clientes = resultado;
      });
  }
  traerUsuarios() {
    this.subscripcion = this._sUsuarios.getUsuario().subscribe((resultado: any) => {
      this.usuarios = resultado;
      console.log(resultado.contenido);
      console.log(this.usuarios);
    })
  }
  ngOnDestroy() {
    //this.subscripcion.unsubscribe();
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  CrearCliente() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando el producto',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    let objUnion = {
      usuario: this.objNewUsuario,
      cliente: this.objClienteNew
    }
    this.subscripcion = this._sUsuarios.postUsuario(objUnion)
      .subscribe((rpta) => {
        if (rpta.content.usu_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El Cliente se ha creado exitosamente!!',
            confirmButtonText: 'Ir a Cliente',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerCliente();
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
    this._sCliente.getClienteById(id).subscribe((rpta) => {
      // console.timeEnd("demoreishon");
      /*   Swal.close(); */


      if (rpta.Cliente.cli_id) {
        // la factura existe y ya llegó
        console.log(id);
        console.log(rpta);
        this.objCliente = rpta.Cliente;

        $("#modalEditar").modal("show");
      }
    })
  }

  AbrirModalCrearCliente() {
    $("#modalCrear").modal("show");
  }

  Guardar() {
    console.log('Cliente');
    let objClie2 = {
      Cliente: this.objCliente
    }
    this._sCliente.putClienteById(objClie2).subscribe((rpta) => {
      console.log(objClie2);
      if (rpta.content.cli_id) {
        this.traerCliente();
        $("#modalEditar").modal("hide");
      }
    })
  }


  eliminarCliente(id) {
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

        this._sCliente.deleteCliente(id).subscribe((rpta) => {
          console.log(rpta);

          if (rpta.id) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.traerCliente();
          }
        })
      }
    })
  }
}

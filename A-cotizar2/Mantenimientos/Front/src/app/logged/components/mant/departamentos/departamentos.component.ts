import { Component, OnInit,OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { DepartamentoService } from '../../../../services/departamento.service';

declare var $: any;
@Component({
  selector: 'app-departamentos',
  templateUrl: './departamentos.component.html',
  styleUrls: ['./departamentos.component.css']
})
export class DepartamentosComponent implements OnInit,OnDestroy {

 
  departamentos;

  subscripcion: Subscription;

  objDepartamentoNew = {
    dept_nom: '',
  }
  objDepartamento = {
    dept_id: '',
    dept_nom: '',
  }

  constructor(private _sDepartamento:DepartamentoService, private _sRouter: Router) { }

  ngOnInit() {
    this.traerDepartamentos();
  }
  traerDepartamentos() {
    this.subscripcion = this._sDepartamento.getDepartamento()
      .subscribe((resultado) => {
        this.departamentos = resultado;
      });
  }

  ngOnDestroy() {
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  CrearDepartamento() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando los datos',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    this.subscripcion = this._sDepartamento.postDepartamento(this.objDepartamentoNew)
      .subscribe((rpta) => {
        if (rpta.contenido.dept_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El Departamento se ha creado exitosamente!!',
            confirmButtonText: 'Ir a Departamentos',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerDepartamentos();
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
    this._sDepartamento.getDepartamentoById(id).subscribe((rpta) => {
      console.log(rpta.Departamento.dept_id);


      if (rpta.Departamento.dept_id) {
        console.log(id);
        console.log(rpta);
        this.objDepartamento = rpta.Departamento;

        $("#modalEditar").modal("show");
      }
    })
  }

  AbrirModalCrearDepartamento() {
    $("#modalCrear").modal("show");
  }

  Guardar() {
    console.log('Departamento');
    let objDept = {
      Departamento: this.objDepartamento
    }
    this._sDepartamento.putDepartamentoById(objDept).subscribe((rpta) => {
      console.log(objDept);
      if (rpta.content.dept_id) {
        this.traerDepartamentos();
        $("#modalEditar").modal("hide");
      }
    })
  }
 

  eliminarDepartamento(id) {
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

        this._sDepartamento.deleteDepartamento(id).subscribe((rpta) => {
          console.log(rpta);

          if (rpta.id) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.traerDepartamentos();
          }
        })
      }
    })
  }
}

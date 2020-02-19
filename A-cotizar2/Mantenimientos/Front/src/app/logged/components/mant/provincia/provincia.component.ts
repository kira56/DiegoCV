import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ProvinciaService } from '../../../../services/provincia.service';
import { DepartamentoService } from '../../../../services/departamento.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
declare var $: any;
@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.css']
})
export class ProvinciaComponent implements OnInit,OnDestroy{
  provincias;
  departamentos;
  subscripcion: Subscription;

  objProvinciasNew = {
    pro_nom: '',
    dept_id:''
  }
  objProvincias = {
    pro_id: '',
    pro_nom: '',
    dept_id:''  
  }

  constructor(private _sProvincias:ProvinciaService,private _sDepartamentos:DepartamentoService, private _sRouter: Router) { }

  ngOnInit() {
    this.traerProvincias();
  }
  traerProvincias() {
    this.subscripcion = this._sProvincias.getProvincia()
      .subscribe((resultado) => {
        this.provincias = resultado;
      });
  }
 traerDepartamento() {
    this.subscripcion = this._sDepartamentos.getDepartamento()
      .subscribe((resultado) => {
        this.departamentos = resultado.contenido;
        console.log(this.departamentos);
        
      });
  }

  ngOnDestroy() {
    try {
      this.subscripcion.unsubscribe();
    } catch (error) {

    }
  }
  CrearProvincia() {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando los datos',
      allowOutsideClick: false,
      showConfirmButton: false
    })

    this.subscripcion = this._sProvincias.postProvincia(this.objProvinciasNew)
      .subscribe((rpta) => {
        if (rpta.contenido.pro_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El Provincia se ha creado exitosamente!!',
            confirmButtonText: 'Ir a Provincias',
            allowOutsideClick: false
          }).then((result) => {
            if (result.value) {
              this.traerProvincias();
              
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
    this._sProvincias.getProvinciaById(id).subscribe((rpta) => {
      console.log(rpta.Provincia.pro_id);


      if (rpta.Provincia.pro_id) {
        console.log(id);
        console.log(rpta);
        this.objProvincias = rpta.Provincia;

        $("#modalEditar").modal("show");
      }
    })
  }

  AbrirModalCrearProvincia() {
    $("#modalCrear").modal("show");
    this.traerDepartamento();
  }

  Guardar() {
    console.log('Provincia');
    let objProv = {
      Provincia: this.objProvincias
    }
    this._sProvincias.putProvinciaById(objProv).subscribe((rpta) => {
      console.log(objProv);
      if (rpta.content.pro_id) {
        this.traerProvincias();
        $("#modalEditar").modal("hide");
      }
    })
  }
 

  eliminarProvincia(id) {
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

        this._sProvincias.deleteProvincia(id).subscribe((rpta) => {
          console.log(rpta);

          if (rpta.id) {
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            );
            this.traerProvincias();
          }
        })
      }
    })
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../../services/usuario.service';
import { CategoriasService } from '../../services/categorias.service';

declare var $: any;
export interface DistritoGroup {
  letra: string;
  nombres: string[];
}
export interface ProvinciaGroup {
  letra1: string;
  nombres1: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-registros',
  templateUrl: './registros.component.html',
  styleUrls: ['./registros.component.css']
})

export class RegistrosComponent implements OnInit ,OnDestroy {
  subscripcion: Subscription;
  categorias;

  objUsuario={
    usu_email:'',
    usu_pass:'',
    usu_est:'activado',
    usu_tipo:'proveedor'
  }
  objProveedor = {
    prov_rz: '',
    prov_RUC: '',
    prov_pweb: '',
    prov_dir:'',
  }
  provcat = {
    cat_id:''
  }


  hide = true;
  color: 'green';
  email = new FormControl('', [Validators.required, Validators.email]);
  checked = false;


  distritoForm: FormGroup = this._formBuilder.group({
    distritoGroup: '',
  });


  distritoGroups: DistritoGroup[] =
    [{
      letra: 'A',
      nombres: ['Alto Selva Alegre', 'Arequipa']
    }, {
      letra: 'C',
      nombres: ['Cayma', 'Cerro Colorado', 'Characato', 'Chiguata']
    }, {
      letra: 'J',
      nombres: ['Jacobo Hunter', 'José Luis Bustamante y Rivero']
    }, {
      letra: 'L',
      nombres: ['La Joya']
    }, {
      letra: 'M',
      nombres: ['Mariano Melgar', 'Miraflores', 'Mollebaya']
    }, {
      letra: 'P',
      nombres: ['Paucarpata', 'Pocsi', 'Polobaya']
    }, {
      letra: 'Q',
      nombres: ['Quequeña']
    }, {
      letra: 'S',
      nombres: ['Sabandia', 'Sachaca', 'San Juan de Tarucani', 'Santa Isabel de Siguas', 'Santa Rita de Siguas', 'San Juan de Juan de Siguas', 'Socabaya']
    }, {
      letra: 'T',
      nombres: ['Tiabaya']
    }, {
      letra: 'V',
      nombres: ['Vitor']
    }, {
      letra: 'Y',
      nombres: ['Yanahuara', 'Yarabamba', 'Yura']
    }];


  distritoGroupOptions: Observable<DistritoGroup[]>;

  constructor(private _formBuilder: FormBuilder,private _sUsuarios: UsuarioService ,private _sCategorias:CategoriasService) { }

  ngOnInit() {
    this.distritoGroupOptions = this.distritoForm.get('distritoGroup')!.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterGroup(value))
      );
      this.traerCategorias();
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
  private _filterGroup(value: string): DistritoGroup[] {
    if (value) {
      return this.distritoGroups
        .map(group => ({ letra: group.letra, nombres: _filter(group.nombres, value) }))
        .filter(group => group.nombres.length > 0);
    }

    return this.distritoGroups;
  }
  mensajeError() {
    return this.email.hasError('required') ? 'Debe ingresar un valor' :
      this.email.hasError('email') ? 'Email no valido' : '';
  }
  RegistrarProve()
  {
    Swal.fire({
      title: 'Espere un momento',
      text: 'Estamos guardando el producto',
      allowOutsideClick: false,
      showConfirmButton: false
    })
    let objUnion = {
      usuario: this.objUsuario,
      proveedor: this.objProveedor,
      provcat:this.provcat
    }
    console.log("aqui");
    
    this.subscripcion = this._sUsuarios.postProveedorUsuario(objUnion)
      .subscribe((rpta) => {

        if (rpta.content.usu_id) {
          // si tiene un campo id asignado, implica que el objeto fue creado
          Swal.fire({
            title: 'Éxito!',
            text: 'El Proveedor se ha creado exitosamente!!',
            confirmButtonText: 'Ir a Proveedor',
            allowOutsideClick: false
          }).then((result) => {
              console.log("Creado Usuario/Proveedor");
          })

        }
      })
  }

}

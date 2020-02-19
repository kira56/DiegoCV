import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {Subscription} from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SolicitudService } from '../../../services/solicitud.service';

@Component({
  selector: 'app-stepper2',
  templateUrl: './stepper2.component.html',
  styleUrls: ['./stepper2.component.css']
})
export class Stepper2Component implements OnInit {

  @Input() regForm: FormGroup;

  constructor(private _sCategorias:CategoriaService,
    private _sSolicitud: SolicitudService) { }

  misCategorias:any;
  categorias = [];
  solicitudLocal:any;
  subs:Subscription;

  subcategorias = []

  ngOnInit() {

    this.misCategorias = this._sCategorias.subcategorias;
    console.log(this.misCategorias);
    
    this.subs = this._sSolicitud.solicitudActual.subscribe(solicitudRecibida => {
      this.solicitudLocal = solicitudRecibida;
      console.log("1era sub EN PASO 2",this.solicitudLocal);
    });
  }
  
  anadirSubCategoria(subcategoria:any,index:number,subcategorias:string){
    this.solicitudLocal.subcategoria = subcategoria;
    this._sSolicitud.modificarSolicitud(this.solicitudLocal);
    console.log("añadiendo categoria",this.solicitudLocal);

    this.subcategorias[index]['subcategorias'] = subcategorias
    console.log('posicion de subcategorias',index,subcategorias);
    
  }

  step2Submitted() {
    this.regForm.get('subcategoria').get('subcategoria').markAsTouched();
    this.regForm.get('subcategoria').get('subcategoria').updateValueAndValidity();
  }

}

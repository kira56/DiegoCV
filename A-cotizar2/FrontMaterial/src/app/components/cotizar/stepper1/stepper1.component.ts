import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriaService } from '../../../services/categoria.service';
import { SolicitudService } from '../../../services/solicitud.service';
import { find } from 'rxjs/operators';

@Component({
  selector: 'app-stepper1',
  templateUrl: './stepper1.component.html',
  styleUrls: ['./stepper1.component.css']
})
export class Stepper1Component implements OnInit {

  @Input() regForm: FormGroup;
  misCategorias: any;
  solicitudLocal: any;
  subs: Subscription;
  subcategorias:any;
  categoria:any;


  subcategoriaObj:any;
  ValueID:number = 0


  constructor(private _sCategorias: CategoriaService,
    private _sSolicitud: SolicitudService) {

     }


  ngOnInit() {
    this.misCategorias = this._sCategorias.categorias;
    this.subs = this._sSolicitud.solicitudActual.subscribe(solicitudRecibida => {
      this.solicitudLocal = solicitudRecibida;
      // console.log(this.misCategorias);
    });
  }

  findSubcategoriaConstruccion(c){
    for(c = 0;c<this.misCategorias.length;c++){
        if(this.misCategorias[c].categoria === 'CONSTRUCCION'){
          console.log('subcategorias construccion',this.misCategorias[c].subcategorias);
        }
    
    }
  }

  // buscarSubcategoria(subcategorias){
  //   subcategorias = this.misCategorias.find(categoria => categoria.subcategorias === 'ABARROTES' )

  //   console.log('Aqui deberian aparecer mis subcategorias',subcategorias);
    
  // }

  // seleccionSubcategoria(id:any){
  //   console.log(id,' mis subcategorias lalalalala');
    
  //   this.ValueID = (id.categoria || id.subcategorias).value;
  //   for(let i = 0; i < this.misCategorias.length;i++){
  //     if(this.misCategorias[i].id == this.ValueID){
  //       this.subcategoriaObj = this.misCategorias[i];
  //     }      

  //   }
  // }

  anadirCategoria(categoria: any) {
    this.solicitudLocal.categoria = categoria;
    this._sSolicitud.modificarSolicitud(this.solicitudLocal);
    // console.log("añadiendo categoria", this.solicitudLocal);
  }

  anadirSubcategoria(subcategorias: any) {
    this.solicitudLocal.subcategoria = subcategorias;
    this._sSolicitud.modificarSolicitud(this.solicitudLocal);
  }



  
  
}

import { Component, OnInit, Input } from '@angular/core';
import {FormControl,FormGroup, FormBuilder, FormArray} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { ProductosService } from 'src/app/services/productos.service';
@Component({
  selector: 'app-stepper2',
  templateUrl: './stepper2.component.html',
  styleUrls: ['./stepper2.component.css']
})
export class Stepper2Component implements OnInit {

  productos;
  subscripcion: Subscription;
  myControl = new FormControl();
  prod_nomb: any;
  ListaProductos:Array<any>;

  constructor(private _sProductos: ProductosService){
    this.ListaProductos = [];
  }
  @Input() regForm: FormGroup;
  ngOnInit() {
    //OBTENER ID DE SUCATEGORIA PARA LA BUSQUEDA
    this.traerProductos(1);
    
  }
  anadirProductoLocal(){
    let productoTmp = {
      prod_nomb:this.prod_nomb,
    };
    this.ListaProductos.push(productoTmp);
    this.prod_nomb="";
    
  }
  traerProductos(id) {
    this.subscripcion = this._sProductos.getProductoByIdScat(id)
      .subscribe((resultado) => {
        this.productos = Object.values(resultado.contenido);
      });
  }
}

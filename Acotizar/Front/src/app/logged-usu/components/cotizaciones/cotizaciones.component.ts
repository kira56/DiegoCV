import { Component, OnInit, Input} from '@angular/core';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { CotizacionDetalleService } from 'src/app/services/cotizacion-detalle.service';

declare function initPlugins();

@Component({
  selector: 'app-cotizaciones',
  templateUrl: './cotizaciones.component.html',
  styleUrls: ['./cotizaciones.component.css']
})
export class CotizacionesComponent implements OnInit {

  isLinear = false;
  myControl = new FormControl();
  firstFormGroup: FormGroup;
  disableSelect = new FormControl(false);
  productos;
  prod_nomb: any;
  producto_id: any;
  ListaProductos:Array <any>;
  ListaProductos2:Array <any>;

  categorias;
  subcategorias;
  
  cotizacionNew ={
    coti_nro: '',
    coti_fech: new Date(),
    coti_est: 'PENDIENTE',
    usu_id: ''
  };
  cotiDetalle ={
    cdet_cant:'',
    coti_id:'',
    prod_id:'',
  };
  subscripcion: Subscription;
  constructor(private _sCategorias: CategoriaService,
    private _sSubCategorias: SubcategoriaService, 
    private _sRouter: Router,
    private _formBuilder: FormBuilder,
    private _sProductos: ProductosService,
    private _sUsuarios: UsuarioService,
    private _sCotizacion: CotizacionService,
    private _sCotizacionDetalle: CotizacionDetalleService
    ) { this.ListaProductos = [];
        this.ListaProductos2= [];}

    @Input() regForm: FormGroup;
  ngOnInit() {
    initPlugins();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.traerCategorias();
    this.cotizacionNew.usu_id= this._sUsuarios.getIdUser();
  }
  //selectedSCat = selecciona categorias disponibles
  selectedSCat: any;
  getSelectedSCat(){
    this.traerSubCategorias(this.selectedSCat);
  }

  //selectedSCat1 = selecciona sub categorias disponibles
  selectedSCat1: any;
  getSelectedSCat1(){
       this.traerProductos(this.selectedSCat1);
  }

  testChange(e,i){
    // console.log("algo ha cambiado", e.target.value)
    // console.log("index",i)
    this.ListaProductos[i].prod_cant = e.target.value;
    this.ListaProductos2[i].cdet_cant = e.target.value;

    // console.log("actualizando lista", this.ListaProductos)
  }

  traerCategorias() {
    this.subscripcion = this._sCategorias.getCategoria()
      .subscribe((resultado) => {
        this.categorias = Object.values(resultado.contenido);
      });
  }
  traerSubCategorias(id) {
    this.subscripcion = this._sSubCategorias.getSCategoriasByIdCat(id)
    .subscribe((resultado)=>{
      this.subcategorias = Object.values(resultado.content);
    });
    
  }
  anadirProductoLocal(){
    // COTIZACION ID
    let idnombarr = this.prod_nomb.split('.');
    let productoTmp = {
      prod_cant:0,
      prod_id:idnombarr[0],
      prod_nomb:idnombarr[1],
      coti_id:'',
    };
    this.ListaProductos.push(productoTmp);
    this.prod_nomb="";
    let nuevoDetalle ={
      cdet_cant: 0,
      prod_id: idnombarr[0],
      coti_id: ''
    }
    this.ListaProductos2.push(nuevoDetalle);
  }
  traerProductos(id) {
    this.subscripcion = this._sProductos.getProductoByIdScat(id)
      .subscribe((resultado) => {
        this.productos = Object.values(resultado.contenido);
        // console.log("PRODUCTOS:",this.productos);
      });
  }
  removeItem(item){
    this.ListaProductos.splice(item,1);
  }
  enviarCotizacion(){
    console.log("CABECERA:",this.cotizacionNew);
    console.log("DETALLE:",this.ListaProductos);
    this.subscripcion = this._sCotizacionDetalle.postCotizacionDetalle(this.cotizacionNew,this.ListaProductos2)
    .subscribe((rpta)=>{
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Se Envio Correctamente su COTIZACION',
        showConfirmButton: false,
        timer: 1500
      });
      console.log(rpta);
    });

    
  }
}

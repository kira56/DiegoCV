import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria.service';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProductoentidadService } from 'src/app/services/productoentidad.service';
import { EntidadService } from '../../../services/entidad.service';
declare function initPlugins();
@Component({
  selector: 'app-misproductos',
  templateUrl: './misproductos.component.html',
  styleUrls: ['./misproductos.component.css']
})
export class MisproductosComponent implements OnInit {

  isLinear = false;
  myControl = new FormControl();
  firstFormGroup: FormGroup;
  disableSelect = new FormControl(false);
  productos;
  prod_nomb: any;
  producto_id: any;
  ListaProductos: Array<any>;
  ListaProductos2: Array<any>;
  idUSer: any;
  idEntidad: any;
  categorias;
  subcategorias;

  subscripcion: Subscription;

  objEntidadProducto: {
    usu_id: '',
    prod_id: ''
  }

  constructor(
    private _formBuilder: FormBuilder,
    private _sCategorias: CategoriaService,
    private _sSubCategorias: SubcategoriaService,
    private _sProductos: ProductosService,
    private s_Usuarios: UsuarioService,
    private _sProductoEntidad: ProductoentidadService,
    private _sEntidades: EntidadService
  ) {
    this.ListaProductos = [];
    this.ListaProductos2 = [];
  }

  ngOnInit() {
    initPlugins();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.traerCategorias();
    this.idEntidad = this._sEntidades.getIdEnt();
    // this.idUSer = this.s_Usuarios.getIdUser();
    // console.log("ID_USER:", this.idUSer);

    // this.cotizacionNew.usu_id= this._sUsuarios.getIdUser();
  }
  //selectedSCat = selecciona categorias disponibles
  selectedSCat: any;
  getSelectedSCat() {
    this.traerSubCategorias(this.selectedSCat);
  }

  //selectedSCat1 = selecciona sub categorias disponibles
  selectedSCat1: any;
  getSelectedSCat1() {
    this.traerProductos(this.selectedSCat1);
  }
  traerCategorias() {
    this.subscripcion = this._sCategorias.getCategoria()
      .subscribe((resultado) => {
        this.categorias = Object.values(resultado.contenido);
      });
  }
  traerSubCategorias(id) {
    this.subscripcion = this._sSubCategorias.getSCategoriasByIdCat(id)
      .subscribe((resultado) => {
        this.subcategorias = Object.values(resultado.content);
        // console.log(this.subcategorias);
      });
  }
  traerProductos(id) {
    this.subscripcion = this._sProductos.getProductoByIdScat(id)
      .subscribe((resultado) => {
        this.productos = Object.values(resultado.contenido);
        // console.log("PRODUCTOS:",this.productos);
      });
  }
  removeItem(item) {
    this.ListaProductos.splice(item, 1);
    this.ListaProductos2.splice(item, 1);
  }
  anadirProductoLocal() {
    // COTIZACION ID
    let idnombarr = this.prod_nomb.split('.');
    let productoTmp = {
      prod_id: idnombarr[0],
      prod_nomb: idnombarr[1],
      coti_id: '',
    };

    this.ListaProductos.push(productoTmp);
    this.prod_nomb = "";

    console.log("ID ENT", this.idEntidad);
    
    let nuevoArreglo = {
      prod_id: idnombarr[0],
      //ENTIDAD
      // usu_id: '4'
      ent_id:this.idEntidad
    }

    this.ListaProductos2.push(nuevoArreglo);
  }
  guardarDatos() {
    console.log("por grabar:", this.ListaProductos2);
    
    this.subscripcion = this._sProductoEntidad.postProductoentidad(this.ListaProductos2)
      .subscribe((rpta) => {
        console.log(rpta);

      })

  }

}

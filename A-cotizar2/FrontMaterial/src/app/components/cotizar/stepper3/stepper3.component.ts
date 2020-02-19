import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { startWith, map } from "rxjs/operators";
import { SolicitudService } from "../../../services/solicitud.service";
import { CotizarService } from 'src/app/services/cotizar.service';



export interface DistritoGroup {
  letra: string;
  nombres: string[];
}

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: "app-stepper3",
  templateUrl: "./stepper3.component.html",
  styleUrls: ["./stepper3.component.css"]
})
export class Stepper3Component implements OnInit {
  @Input() regForm: FormGroup;

  solicitudLocal: any;
  subs: Subscription;
  productoLocal:Object;
  ListaProductos:Array<any>;
  prod_nom:any;
  prod_cant:any;
  prod_umed:any;
  prod_des:any;
  prod_ciu:any;


  get productos() {
    return this.regForm.get("datosProducto") as FormArray;
  }

  distritoForm: FormGroup = this._formBuilder.group({
    distritoGroup: ""
  });

  distritoGroups: DistritoGroup[] = [
    {
      letra: "A",
      nombres: ["Alto Selva Alegre", "Arequipa"]
    },
    {
      letra: "C",
      nombres: ["Cayma", "Cerro Colorado", "Characato", "Chiguata"]
    },
    {
      letra: "J",
      nombres: ["Jacobo Hunter", "José Luis Bustamante y Rivero"]
    },
    {
      letra: "L",
      nombres: ["La Joya"]
    },
    {
      letra: "M",
      nombres: ["Mariano Melgar", "Miraflores", "Mollebaya"]
    },
    {
      letra: "P",
      nombres: ["Paucarpata", "Pocsi", "Polobaya"]
    },
    {
      letra: "Q",
      nombres: ["Quequeña"]
    },
    {
      letra: "S",
      nombres: [
        "Sabandia",
        "Sachaca",
        "San Juan de Tarucani",
        "Santa Isabel de Siguas",
        "Santa Rita de Siguas",
        "San Juan de Juan de Siguas",
        "Socabaya"
      ]
    },
    {
      letra: "T",
      nombres: ["Tiabaya"]
    },
    {
      letra: "V",
      nombres: ["Vitor"]
    },
    {
      letra: "Y",
      nombres: ["Yanahuara", "Yarabamba", "Yura"]
    }
  ];

  distritoGroupOptions: Observable<DistritoGroup[]>;

  unidad: Array<any> = [
    { nombre: "Pies" },
    { nombre: "Pulgadas" },
    { nombre: "Metros" },
    { nombre: "Onzas" },
    { nombre: "Cajas" }
  ];

  constructor(private _formBuilder: FormBuilder,
    private _sSolicitud: SolicitudService,
    private _sCotizar:CotizarService) {
      this.ListaProductos = []
    }

  ngOnInit() {
    this.distritoGroupOptions = this.distritoForm
      .get("distritoGroup")!
      .valueChanges.pipe(
        startWith(""),
        map(value => this._filterGroup(value))
      );

      this.subs = this._sSolicitud.solicitudActual.subscribe(solicitudRecibida => {
        this.solicitudLocal = solicitudRecibida;
        console.log("3er paso",this.solicitudLocal);
      });

      
  }
  private _filterGroup(value: string): DistritoGroup[] {
    if (value) {
      return this.distritoGroups
        .map(group => ({
          letra: group.letra,
          nombres: _filter(group.nombres, value)
        }))
        .filter(group => group.nombres.length > 0);
    }

    return this.distritoGroups;
  }
  anadirProductoLocal(){
    let productoTmp = {
      prod_nom:this.prod_nom,
      prod_cant:this.prod_cant,
      prod_umed:this.prod_umed,
      prod_des:this.prod_des,
      prod_ciu:this.prod_ciu
    }
    this.ListaProductos.push(productoTmp);
    this.prod_nom = '';
    this.prod_cant = '';
    this.prod_umed = '';
    this.prod_des = '';
    this.prod_ciu = '';

  }

  anadirListaProductos(){
    this.solicitudLocal.listaProductos = this.ListaProductos;
    this._sSolicitud.modificarSolicitud(this.solicitudLocal);
    console.log("3 añadiendo productos",this.solicitudLocal);
  }


  objCategoria={
    cat_nom:''
  }
  objSubcategoria={
    subc_nom:''
  }
  objCotizacion={
    detcot_producto:'',
    detcot_cantidad:'',
    detcot_especificacion:''
  }

  objMedida={
    um_nom:''
  }
  

  enviarCotizacion(){
    // Swal.fire({
    //   title:'Espere un momento',
    //   text:'Estamos guardado la cotizacion',
    //   allowOutsideClick:false,
    //   showConfirmButton:false
    // })

    let objCotizacionUnion = {
      categoria: this.objCategoria,
      subcategoria:this.objSubcategoria,
      detalleCotizacion:this.objCotizacion,
      unidadMedida:this.objMedida
    }
    this.subs = this._sCotizar.postCotizacion(objCotizacionUnion).subscribe((rpta)=>{
    })
  }


  // objCategoria={
  //   cat_nom:''
  // }
  // objSubcategoria={
  //   subc_nom:''
  // }
  // objCotizacion={
  //   detcot_producto:'',
  //   detcot_cantidad:'',
  //   detcot_especificacion:''
  // }

  // objMedida={
  //   um_nom:''
  // }

  step3Submitted() {
    this.regForm
      .get("datosProducto")
      .get("producto")
      .markAsTouched();
    this.regForm
      .get("datosProducto")
      .get("producto")
      .updateValueAndValidity();
    this.regForm
      .get("datosProducto")
      .get("cantidad")
      .markAsTouched();
    this.regForm
      .get("datosProducto")
      .get("cantidad")
      .updateValueAndValidity();
    this.regForm
      .get("datosProducto")
      .get("medida")
      .markAsTouched();
    this.regForm
      .get("datosProducto")
      .get("medida")
      .updateValueAndValidity();
  }
}

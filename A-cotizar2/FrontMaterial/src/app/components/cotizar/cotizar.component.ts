import { Component, OnInit, Inject } from "@angular/core";
import {FormGroup,FormBuilder,Validators,FormControl} from "@angular/forms";

import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { CotizarService } from 'src/app/services/cotizar.service';

@Component({
  selector: "app-cotizar",
  templateUrl: "./cotizar.component.html",
  styleUrls: ["./cotizar.component.css"]
})
export class CotizarComponent implements OnInit {

  cotizarForm: FormGroup;
  categoriasForm: FormGroup;
  subscripcion: Subscription


 

  categoria: string[] = ["ABARROTES", "CONSTRUCCION", "TECNOLOGIA"];

  default: string = "ABARROTES";

  constructor(public fb: FormBuilder,
              private _sCotizar:CotizarService) { }

  ngOnInit() {
    this.cotizarForm = new FormGroup({
      categoria: new FormControl({}),
      subcategoria: new FormGroup({
        subcategoria: new FormControl(null, [
          Validators.required,
          Validators.email
        ])
      }),
      datosProducto: new FormGroup({
        producto: new FormControl(null, Validators.required),
        cantidad: new FormControl(null, Validators.required),
        medida: new FormControl(null, Validators.required),
        descripcion: new FormControl(null),
        ciudad: new FormControl(null)
      })
    });
  }


  
}

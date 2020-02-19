import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriaService } from 'src/app/services/categoria.service';
import { Router } from '@angular/router';
import { SubcategoriaService } from 'src/app/services/subcategoria.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
  selector: 'app-stepper1',
  templateUrl: './stepper1.component.html',
  styleUrls: ['./stepper1.component.css']
})
export class Stepper1Component implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  disableSelect = new FormControl(false);
  categorias;
  subcategorias;
  subscripcion: Subscription;
  constructor(private _sCategorias: CategoriaService,
              private _sSubCategorias: SubcategoriaService, 
              private _sRouter: Router,
              private _formBuilder: FormBuilder
             ) { }

  ngOnInit() {
    // initPlugins();
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.traerCategorias();
  }
  selectedSCat: any;
  getSelectedSCat(){
    console.log("Categoria ID",this.selectedSCat);
    this.traerSubCategorias(this.selectedSCat);
  }
  selectedSCat1: any;
  getSelectedSCat1(){
    console.log("Sub Categoria ID",this.selectedSCat1);
    // this.traerSubCategorias(this.selectedSCat);
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
      console.log(this.subcategorias);
    });
  }
}

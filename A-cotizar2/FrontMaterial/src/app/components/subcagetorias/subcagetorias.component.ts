import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';


@Component({
  selector: 'app-subcagetorias',
  templateUrl: './subcagetorias.component.html',
  styles: []
})
export class SubcagetoriasComponent implements OnInit {

  subcat = [
    {nombre:"Ferreteria"},
    {nombre:"Gasfiteria"},
    {nombre:"Fijaciones y adhesivos"},
    {nombre:"Electricidad"},
    {nombre:"Pinturas"},
    {nombre:"Seguridad"},
    {nombre:"Puertas, ventanas y cerraduras"}

  ]

  constructor(public dialogRef:MatDialogRef<SubcagetoriasComponent>,
    @Inject(MAT_DIALOG_DATA) public message:string) { }

  ngOnInit() {
  }

  subcategoriaSelect(index:number,nombre:string):void {
    this.subcat[index]['nombre'] = nombre;
    console.log(index,`Elegiste la SUBCATEGORIA ${nombre}`);
    this.dialogRef.close();
    
  }

}

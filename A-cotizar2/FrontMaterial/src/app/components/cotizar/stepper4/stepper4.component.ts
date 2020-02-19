import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-stepper4',
  templateUrl: './stepper4.component.html',
  styleUrls: ['./stepper4.component.css']
})
export class Stepper4Component implements OnInit {

  @Input() regForm: FormGroup;
  formSubmitted: boolean = false;


  constructor() { }

  ngOnInit() {
  }

  
  submit() {
    console.log('cotizacionEnviada');
    console.log(this.regForm.value);
    this.formSubmitted = true;

  }

}

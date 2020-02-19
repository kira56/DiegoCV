
import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.css']
})
export class ContenidoComponent {
  option: string = "";
  step = 0;

  panelOpenState = false;

  lenguajes = [
    {
      nombre: 'Javascript',
      level: '',
      url: '../../../assets/imagens/javascript.png'
    },
    {
      nombre: 'Python',
      level: '',
      url: '../../../assets/imagens/python.png'
    },
    {
      nombre: 'C++',
      level: '',
      url: '../../../assets/imagens/cplusplus.svg'
    },
    {
      nombre: 'PHP',
      level: '',
      url: '../../../assets/imagens/php.png'
    },
    {
      nombre: 'C#',
      level: '',
      url: '../../../assets/imagens/csharp.png'
    },
    {
      nombre: 'Ruby',
      level: '',
      url: '../../../assets/imagens/ruby.png'
    },
    {
      nombre: 'Java',
      level: '',
      url: '../../../assets/imagens/java.png'
    },
    {
      nombre: 'HTML',
      level: '',
      url: '../../../assets/imagens/html.png'
    },
    {
      nombre: 'CSS',
      level: '',
      url: '../../../assets/imagens/css-3.png'
    }
  ];
  frameworks = [
    {
      nombre: 'Angular',
      level1: '',
      url: '../../../assets/imagens/angular.png'
    },
    {
      nombre: 'React',
      level1: '',
      url: '../../../assets/imagens/react.png'
    },
    {
      nombre: 'Django',
      level1: '',
      url: '../../../assets/imagens/django.svg'
    },
    {
      nombre: 'Laravel',
      level1: '',
      url: '../../../assets/imagens/laravel.png'
    },
    {
      nombre: 'Vuejs',
      level1: '',
      url: '../../../assets/imagens/vuejs.png'
    },
    {
      nombre: 'SASS',
      level1: '',
      url: '../../../assets/imagens/sass.png'
    },
    {
      nombre: 'LESS',
      level1: '',
      url: '../../../assets/imagens/less.svg'
    }
  ];

  clouds = [
    {
      nombre: 'Compute Engine',
      level1: '',
      url: '../../../assets/imagens/serve.svg'
    },
    {
      nombre: 'Cloud Storage',
      level1: '',
      url: '../../../assets/imagens/storage.svg'
    },
    {
      nombre: 'Cloud SQL',
      level1: '',
      url: '../../../assets/imagens/sql.svg'
    },
    {
      nombre: 'Cloud Server',
      level1: '',
      url: '../../../assets/imagens/serve.svg'
    },
    {
      nombre: 'Cloud BigQuery',
      level1: '',
      url: '../../../assets/imagens/bigquery.svg'
    },
    {
      nombre: 'Anthos',
      level1: '',
      url: '../../../assets/imagens/serve.svg'
    },
  ];

  constructor(public opciones: MatDialog,
              public auth:AuthService) { }

  ngOnInit() {
    this.nextStep();


  }
  setStep(index: number) {
    this.step = index;
  }

  changeColorLanguages(index: number, level: string,nombre:string): void {
    console.log(index, level,nombre);

    this.lenguajes[index]['level']['nombre'] = level + nombre;
    this.nextStep();

    
  }
  changeColorFrameworks(index: number, level1: string): void {
    console.log(index, level1);
    this.frameworks[index]['level'] = level1;


  }
  changeColorClouds(index: number, level2: string): void {
    console.log(index, level2);
    this.clouds[index]['level'] = level2;

  }
  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }
}



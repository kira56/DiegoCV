import { Component, OnInit } from '@angular/core';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

declare function initPlugins();

@Component({
  selector: 'app-miscotizaciones',
  templateUrl: './miscotizaciones.component.html',
  styleUrls: ['./miscotizaciones.component.css']
})
export class MiscotizacionesComponent implements OnInit {

  miscotizaciones;
  subscripcion: Subscription;
  objCotizacion = {
    coti_id: '',
    coti_fech: '',
    coti_est: ''
  }
  cargando: boolean = true;
  estado: string = 'PENDIENTE';
  constructor(private _sCotizaciones: CotizacionService,
              private _sRouter: Router ) { }

  ngOnInit() {
    initPlugins();
    this.traerCotizaciones(this.estado);
  }
  traerCotizaciones(est){
    this.cargando = true;
    this.subscripcion=this._sCotizaciones.getCotizacionByEstado(est)
    .subscribe((resultado)=>{
      this.miscotizaciones=Object.values(resultado.contenido);
      this.cargando = false;
    });
  }
}

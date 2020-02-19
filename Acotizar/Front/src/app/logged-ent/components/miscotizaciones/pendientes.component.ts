import { Component, OnInit } from '@angular/core';
import { CotizacionService } from 'src/app/services/cotizacion.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { CotizacionentidadService } from 'src/app/services/cotizacionentidad.service';
import { EntidadService } from '../../../services/entidad.service';
import { CotizacionDetalleService } from 'src/app/services/cotizacion-detalle.service';
declare function initPlugins();
declare var $: any;
@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.component.html',
  styleUrls: ['./pendientes.component.css']
})
export class PendientesComponent implements OnInit {

  miscotizaciones;
  listaDetalle:[];
  subscripcion: Subscription;
  objCotizacion = {
    coti_id: '',
    coti_fech: '',
    coti_est: ''
  };
  idEnt:any;
  cargando: boolean = true;
  estado: string = 'pendiente';
  constructor(private _sCotizacionesEntidad: CotizacionentidadService,
              private _sEntidades: EntidadService,
              private _sCotizacionDetalle: CotizacionDetalleService,
              private _sRouter: Router ) { }

  ngOnInit() {
    initPlugins();
    this.idEnt = this._sEntidades.getIdEnt();
    // this.traerCotizaciones(this.idEnt,this.estado);
    this.traerCotizaciones(this.estado);

  }

  /////////////////////////
  // ENVIAR  Y IDENT-EST

  traerCotizaciones(estado){
    this.cargando = true;
    // console.log("IDE",idEntidad);
    
    this.subscripcion = this._sCotizacionesEntidad.getCotizacionEntidadByEstado(estado)
    .subscribe((resultado)=>{
      this.miscotizaciones = Object.values(resultado.contenido);
      this.cargando = false;
    });
  }

  AbrirModalCrearSubCategoria(ids) {
    $("#modalCrear").modal("show");
    this.subscripcion= this._sCotizacionDetalle.getDetalle(ids)
    .subscribe((rpta)=>{
      console.log("DETALLE:",rpta);
      this.listaDetalle=rpta.content;
      console.log(this.listaDetalle);
    })
  }
  Cancelar() {
    $("#modalEditar").modal("hide");
    $("#modalCrear").modal("hide");
  }
}

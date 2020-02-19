import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {


  private solicitud = new BehaviorSubject({});

  solicitudActual = this.solicitud.asObservable();

  constructor() { }

  modificarSolicitud(solicitud:Object){
    this.solicitud.next(solicitud);
  }
}

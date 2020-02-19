import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit {

  title = 'FrontMaterial';


  /* MAPBOX */

  mapa: Mapboxgl.Map;

  ngOnInit() {

    Mapboxgl.accessToken = environment.mapboxKey;

    this.mapa = new Mapboxgl.Map({
      container: 'mapa-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [-71.5197702, -16.4290938], // LOG, LAT
      zoom: 14 // starting zoom

    });

    this.crearMarcador(-71.5197702, -16.4290938)
  }

  crearMarcador(lng:number, lat:number){

    const marker = new Mapboxgl.Marker({
      draggable: true
      })
      .setLngLat([lng, lat])
      .addTo(this.mapa);
  }


}
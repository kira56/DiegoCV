import { Component, OnInit } from '@angular/core';
declare function initPlugins();

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initPlugins();
  }

}

import { Component, OnInit } from '@angular/core';
declare function initPlugins();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initPlugins();
  }

}

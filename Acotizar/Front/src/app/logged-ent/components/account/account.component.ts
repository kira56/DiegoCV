import { Component, OnInit } from '@angular/core';
declare function initPlugins();

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    initPlugins();

  }

}

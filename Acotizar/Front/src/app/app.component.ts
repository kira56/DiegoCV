import { SettingsService } from './services/settings.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'Plataforma ACOTIZAR';

  constructor(public _sAjustes: SettingsService) {

  }
}

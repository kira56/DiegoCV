import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/login/register.component';
import { PagesModule } from './pages/pages.module';

// Angular Material Modulos
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatMenuModule } from '@angular/material/menu';
import { MatRippleModule } from '@angular/material/core';
import { MatStepperModule } from '@angular/material/stepper';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSortModule } from '@angular/material/sort';


import { CommonModule } from '@angular/common';




// Flex Layaout
import { FlexLayoutModule } from '@angular/flex-layout';

//Angular Social

import { SocialLoginModule, AuthServiceConfig, FacebookLoginProvider } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { RegistrosComponent } from './components/registros/registros.component';
import { Registros2Component } from './components/registros/registros2.component';

import { PagesComponent } from './pages/pages.component';
import { SubcagetoriasComponent } from './components/subcagetorias/subcagetorias.component';
import { MatRadioModule } from '@angular/material/radio';
import { MatChipsModule } from '@angular/material/chips';

//Importando el modulo HTTP
import { HttpClientModule } from '@angular/common/http'

// Carousel Home

import { OwlModule } from 'ngx-owl-carousel';
import { Stepper1Component } from './components/cotizar/stepper1/stepper1.component';
import { Stepper2Component } from './components/cotizar/stepper2/stepper2.component';
import { Stepper3Component } from './components/cotizar/stepper3/stepper3.component';
import { Stepper4Component } from './components/cotizar/stepper4/stepper4.component';




let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("293788241604-osehfpbphj1nasso1frnt4o8524hokma.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2360833650680709")
  }
]);
export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
   
    LoginComponent,
    RegisterComponent,
    RegistrosComponent,
    Registros2Component,
    
    PagesComponent,
    SubcagetoriasComponent,
    Stepper1Component,
    Stepper2Component,
    Stepper3Component,
    Stepper4Component,
    routingComponents,
  ],
  entryComponents: [
    SubcagetoriasComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatCheckboxModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    MatTabsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatAutocompleteModule,
    FlexLayoutModule,
    SocialLoginModule,
    MatMenuModule,
    MatRippleModule,
    MatStepperModule,
    PagesModule,
    MatDialogModule,
    OwlModule,
    MatRadioModule,
    MatChipsModule,
    HttpClientModule,
    MatSortModule,
    
    
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { NopagefoundComponent } from './components/nopagefound/nopagefound.component';
import { RegisterComponent } from './components/login/register.component';

// rutas
import { AppRoutingModule } from './app.routes';

// modulos
import { LoggedModule } from './logged/logged.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// servicios 

import { FlexLayoutModule } from '@angular/flex-layout';
import { LoggedEntModule } from './logged-ent/logged-ent.module';
import { LoggedUsuModule } from './logged-usu/logged-usu.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NopagefoundComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoggedModule,
    // LoggedEntModule,
    // LoggedUsuModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

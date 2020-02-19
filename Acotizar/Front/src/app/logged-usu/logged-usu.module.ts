import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedUsuComponent } from './logged-usu.component';
import { LoggedUsuRoutesModule } from './logged-usu.routes';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './components/shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountComponent } from './components/account/account.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';

//angular material
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import { Stepper1Component } from './components/cotizaciones/stepper1/stepper1.component';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Stepper2Component } from './components/cotizaciones/stepper2/stepper2.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { Stepper3Component } from './components/cotizaciones/stepper3/stepper3.component';
import { MiscotizacionesComponent } from './components/miscotizaciones/miscotizaciones.component';
import { AtendidasComponent } from './components/miscotizaciones/atendidas.component';

@NgModule({
  declarations: [LoggedUsuComponent, DashboardComponent, BreadcrumbsComponent, HeaderComponent, SidebarComponent, ProfileComponent, AccountComponent, CotizacionesComponent, Stepper1Component, Stepper2Component, Stepper3Component, MiscotizacionesComponent, AtendidasComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    LoggedUsuRoutesModule,
    MatStepperModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatExpansionModule, MatDialogModule, 
    MatInputModule, MatSelectModule, MatCheckboxModule,MatAutocompleteModule,MatDividerModule
  ]
})
export class LoggedUsuModule { }

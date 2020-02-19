import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggedEntComponent } from './logged-ent.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { BreadcrumbsComponent } from './components/shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { AccountComponent } from './components/account/account.component';
import { ProfileComponent } from './components/profile/profile.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { LoggedEntRoutesModule } from './logged-ent.routes';
import { MisproductosComponent } from './components/misproductos/misproductos.component';

//angular material
import {MatStepperModule} from '@angular/material/stepper';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import { AtendidasComponent } from './components/miscotizaciones/atendidas.component';
import { PendientesComponent } from './components/miscotizaciones/pendientes.component';


@NgModule({
  declarations: [DashboardComponent, LoggedEntComponent, BreadcrumbsComponent, HeaderComponent, SidebarComponent, AccountComponent, ProfileComponent, CotizacionesComponent, MisproductosComponent, AtendidasComponent, PendientesComponent],
  imports: [
    CommonModule,FormsModule,ReactiveFormsModule,
    LoggedEntRoutesModule,
    MatStepperModule, MatFormFieldModule, MatCardModule, MatButtonModule, MatExpansionModule, MatDialogModule, 
    MatInputModule, MatSelectModule, MatCheckboxModule,MatAutocompleteModule,MatDividerModule
  ]
})
export class LoggedEntModule { }

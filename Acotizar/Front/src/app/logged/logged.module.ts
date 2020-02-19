import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

//importando el modulo HTTP
import {HttpClientModule} from '@angular/common/http'

// Componentes
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoggedComponent } from './logged.component';
import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { BreadcrumbsComponent } from './components/shared/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './components/shared/header/header.component';
import { SidebarComponent } from './components/shared/sidebar/sidebar.component';
import { FabricanteComponent } from './components/mant/fabricante/fabricante.component';


// rutas
import { LoggedRoutingModule } from './logged.routes';
import { ChartsModule } from 'ng2-charts';
import { ProductoComponent } from './components/mant/producto/producto.component';
import { DepartamentoComponent } from './components/mant/departamento/departamento.component';
import { UnidadMedidaComponent } from './components/mant/unidad-medida/unidad-medida.component';
import { UsuariosComponent } from './components/mant/usuarios/usuarios.component';
import { EntidadComponent } from './components/mant/entidad/entidad.component';
import { CategoriaComponent } from './components/mant/categoria/categoria.component';
import { SubcategoriaComponent } from './components/mant/categoria/subcategoria.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LoggedComponent,
    AccountSettingsComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    FabricanteComponent,
    CategoriaComponent,
    ProductoComponent,
    DepartamentoComponent,
    UnidadMedidaComponent,
    UsuariosComponent,
    EntidadComponent,
    SubcategoriaComponent
  ],
  imports: [
    LoggedRoutingModule,
    CommonModule,
    FormsModule,
    ChartsModule,
    HttpClientModule
  ],
  exports: [
    DashboardComponent,
  ],
  providers: [],
})
export class LoggedModule { }
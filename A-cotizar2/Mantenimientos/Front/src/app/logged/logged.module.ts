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


// rutas
import { LoggedRoutingModule } from './logged.routes';
import { ChartsModule } from 'ng2-charts';
import { UsuariosComponent } from './components/mant/usuarios/usuarios.component';
import { CategoriaComponent } from './components/mant/categoria/categoria.component';
import { SubcategoriasComponent } from './components/mant/subcategorias/subcategorias.component';
import { ProveedorComponent } from './components/mant/proveedor/proveedor.component';
import { DepartamentosComponent } from './components/mant/departamentos/departamentos.component';
import { ProvinciaComponent } from './components/mant/provincia/provincia.component';
import { DistritoComponent } from './components/mant/distrito/distrito.component';
import { UnidadMedidaComponent } from './components/mant/unidad-medida/unidad-medida.component';
import { ClienteComponent } from './components/mant/cliente/cliente.component';
import { CotizacionComponent } from './components/mant/cotizacion/cotizacion.component';


@NgModule({
  declarations: [
    DashboardComponent,
    LoggedComponent,
    AccountSettingsComponent,
    BreadcrumbsComponent,
    HeaderComponent,
    SidebarComponent,
    CategoriaComponent,
    UsuariosComponent,
    SubcategoriasComponent,
    ProveedorComponent,
    DepartamentosComponent,
    ProvinciaComponent,
    DistritoComponent,
    UnidadMedidaComponent,
    ClienteComponent,
    CotizacionComponent,
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
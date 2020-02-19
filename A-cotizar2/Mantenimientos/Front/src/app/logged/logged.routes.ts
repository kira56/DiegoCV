

import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedComponent } from './logged.component';
import { UsuariosComponent } from './components/mant/usuarios/usuarios.component';
import { CategoriaComponent } from './components/mant/categoria/categoria.component';
import { SubcategoriasComponent } from './components/mant/subcategorias/subcategorias.component';
import { ProveedorComponent } from './components/mant/proveedor/proveedor.component';
import { DepartamentosComponent } from './components/mant/departamentos/departamentos.component';
import { DistritoComponent } from './components/mant/distrito/distrito.component';
import { ProvinciaComponent } from './components/mant/provincia/provincia.component';
import { UnidadMedidaComponent } from './components/mant/unidad-medida/unidad-medida.component';
import { ClienteComponent } from './components/mant/cliente/cliente.component';
import { CotizacionComponent } from './components/mant/cotizacion/cotizacion.component';


const routes: Routes = [
  {
    path: '', component: LoggedComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
      // mantenimientos
      { path: 'departamento', component: DepartamentosComponent , data: { titulo: 'Mantenimiento de Departamentos' } },
      { path: 'provincia', component: ProvinciaComponent , data: { titulo: 'Mantenimiento de Provincia' } },
      { path: 'distrito', component: DistritoComponent , data: { titulo: 'Mantenimiento de Distritos' } },
      { path: 'categoria', component: CategoriaComponent , data: { titulo: 'Mantenimiento de Categorias' } },
      { path: 'subcategorias', component: SubcategoriasComponent , data: { titulo: 'Mantenimiento de SubCategorias' } },
      { path: 'cliente', component: ClienteComponent , data: { titulo: 'Mantenimiento de Clientes' } },
      { path: 'cotizacion', component: CotizacionComponent , data: { titulo: 'Mantenimiento de Cotizacion' } },
      { path: 'proveedor', component: ProveedorComponent , data: { titulo: 'Mantenimiento de Proveedores' } },
      { path: 'usuarios', component: UsuariosComponent , data: { titulo: 'Mantenimiento de Usuarios' } },
      { path: 'unime', component: UnidadMedidaComponent , data: { titulo: 'Mantenimiento de Unidad de Medida' } },
      
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }

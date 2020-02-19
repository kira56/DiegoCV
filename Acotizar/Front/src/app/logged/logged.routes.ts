import { FabricanteComponent } from './components/mant/fabricante/fabricante.component';

import { AccountSettingsComponent } from './components/account-settings/account-settings.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedComponent } from './logged.component';
import { ProductoComponent } from './components/mant/producto/producto.component';
import { UnidadMedidaComponent } from './components/mant/unidad-medida/unidad-medida.component';
import { EntidadComponent } from './components/mant/entidad/entidad.component';
import { DepartamentoComponent } from './components/mant/departamento/departamento.component';
import { UsuariosComponent } from './components/mant/usuarios/usuarios.component';
import { CategoriaComponent } from './components/mant/categoria/categoria.component';
import { SubcategoriaComponent } from './components/mant/categoria/subcategoria.component';


const routes: Routes = [
  {
    path: '', component: LoggedComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de Tema' } },
      // mantenimientos
      { path: 'categoria', component: CategoriaComponent , data: { titulo: 'Mantenimiento de Categorias' } },
      { path: 'subcategoria', component: SubcategoriaComponent , data: { titulo: 'Mantenimiento de Categorias' } },

      { path: 'departamentos', component: DepartamentoComponent , data: { titulo: 'Mantenimiento de Departamentos' } },
      { path: 'unidadMedida', component: UnidadMedidaComponent , data: { titulo: 'Mantenimiento de Unidad de Medida' } },
      { path: 'productos', component: ProductoComponent , data: { titulo: 'Mantenimiento de Productos' } },
      
      // { path: 'entidad', component: EntidadComponent , data: { titulo: 'Mantenimiento de Entidad' } },
      
      // { path: 'usuarios', component: UsuariosComponent , data: { titulo: 'Mantenimiento de Usuarios' } },
      { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }

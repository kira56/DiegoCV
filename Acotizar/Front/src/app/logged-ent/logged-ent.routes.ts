import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedEntComponent } from './logged-ent.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountComponent } from './components/account/account.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { MisproductosComponent } from './components/misproductos/misproductos.component';
import { PendientesComponent } from './components/miscotizaciones/pendientes.component';

const routes: Routes = [
    {
        path: '',
        component: LoggedEntComponent,
        children: [
            { path: '', component: DashboardComponent, data: {titulo:'Dashboard'} },
            { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil del Usuario'} },
            { path: 'cuenta', component: AccountComponent, data: {titulo: 'Datos de la Cuenta'} },
            { path: 'cotizaciones', component: CotizacionesComponent, data: {titulo: 'Mis Cotizaciones'} },
            { path: 'misproductos', component: MisproductosComponent, data: {titulo: 'Mis Productos'} },
            { path: 'pendientes', component: PendientesComponent, data: {titulo: 'Mis Cotizaciones Pendientes'} },
            { path: 'atendidas', component: PendientesComponent, data: {titulo: 'Mis Cotizaciones Atendidas'} },
        
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class LoggedEntRoutesModule { }
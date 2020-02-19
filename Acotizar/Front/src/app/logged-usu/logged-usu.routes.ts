import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoggedUsuComponent } from './logged-usu.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AccountComponent } from './components/account/account.component';
import { CotizacionesComponent } from './components/cotizaciones/cotizaciones.component';
import { MiscotizacionesComponent } from './components/miscotizaciones/miscotizaciones.component';
import { AtendidasComponent } from './components/miscotizaciones/atendidas.component';

const routes: Routes = [
    {
        path: '',
        component: LoggedUsuComponent,
        children: [
            { path: '', component: DashboardComponent, data: {titulo:'Dashboard'} },
            { path: 'perfil', component: ProfileComponent, data: {titulo: 'Perfil'} },
            { path: 'cuenta', component: AccountComponent, data: {titulo: 'Datos de la Cuenta'} },
            { path: 'cotizaciones', component: CotizacionesComponent, data: {titulo: 'Cotizaciones'} },
            { path: 'miscotizaciones', component: MiscotizacionesComponent , data: {titulo: 'Mis Cotizaciones'} },
            { path: 'atendidas', component: AtendidasComponent , data: {titulo: 'Mis Cotizaciones - A'} },

            { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    declarations: [],
})
export class LoggedUsuRoutesModule { }
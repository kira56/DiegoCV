import { RouterModule, Routes } from "@angular/router";
import { UsuarioClienteComponent } from './usuario-cliente/usuario-cliente.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileBlankComponent } from './profile-blank/profile-blank.component';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';

const pagesRoutes: Routes = [
    {
        path: 'usuarioCliente',
        component: UsuarioClienteComponent,
        children: [{
            path: 'overview',
            component: ProfileOverviewComponent,
            data: { title: 'Overview', breadcrumb: 'OVERVIEW' }
        },
        {
            path: 'settings',
            component: ProfileSettingsComponent,
            data: { title: 'Settings', breadcrumb: 'SETTINGS' }
        },
        {
            path: 'blank',
            component: ProfileBlankComponent,
            data: { title: 'Blank', breadcrumb: 'BLANK' }
        }]
    }
    
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes)
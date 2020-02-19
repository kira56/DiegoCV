import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BienvenidosComponent } from './components/bienvenidos/bienvenidos.component';
import { ContenidoComponent } from './components/contenido/contenido.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { combineAll } from 'rxjs/operators';
import { SidenavComponent } from './components/sidenav/sidenav.component';

const routes: Routes = [
  {
    path:'',
    component:BienvenidosComponent
  },
  {
    path:'bienvenidos',
    component:BienvenidosComponent
  },
  {
    path:'contenido/sidenav',
    component:SidenavComponent,canActivate:[AuthGuard]
  },
  {
    path:'contenido',
    component:ContenidoComponent,canActivate:[AuthGuard]
  },
  {
    path:'sidenav',
    component:SidenavComponent,canActivate:[AuthGuard]
  },
  {
    path:'login',
    component:LoginComponent,canActivate:[AuthGuard]
  },
  {
    path:'registro',
    component:RegistroComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

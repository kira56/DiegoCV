import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/login/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegistrosComponent } from './components/registros/registros.component';
import { Registros2Component } from './components/registros/registros2.component';
import { CotizarComponent } from './components/cotizar/cotizar.component';
import { UsuarioClienteComponent } from './pages/usuario-cliente/usuario-cliente.component';
import { UsuarioProveedorComponent } from './pages/usuario-proveedor/usuario-proveedor.component';



const routes: Routes = [
  {
    path:'home',component:HomeComponent
  },
  {
    path:'cotizar',component:CotizarComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'login',component:LoginComponent
  },
  {
    path:'registroProveedor',component:RegistrosComponent
  },
  {
    path:'registroCliente',component:Registros2Component
  },
  
  {
    path:'',component:HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [HomeComponent, CotizarComponent]

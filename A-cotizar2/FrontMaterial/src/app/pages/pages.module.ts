import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsuarioClienteComponent } from './usuario-cliente/usuario-cliente.component';
import { UsuarioProveedorComponent } from './usuario-proveedor/usuario-proveedor.component';
import { PAGES_ROUTES } from './pages.routing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { 
  MatIconModule,
  MatCardModule,
  MatMenuModule,
  MatSlideToggleModule,
  MatGridListModule,
  MatChipsModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTabsModule,
  MatInputModule,
  MatProgressBarModule
 } from '@angular/material';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ProfileBlankComponent } from './profile-blank/profile-blank.component';
import { ProfileOverviewComponent } from './profile-overview/profile-overview.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ChartsModule } from 'ng2-charts';
import { FileSelectDirective, FileDropDirective, FileUploadModule } from 'ng2-file-upload';
@NgModule({

  declarations: [
    UsuarioClienteComponent,
    UsuarioProveedorComponent,
    ProfileSettingsComponent,
    ProfileBlankComponent,
    ProfileOverviewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PAGES_ROUTES,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatSlideToggleModule,
    MatGridListModule,
    MatChipsModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTabsModule,
    MatInputModule,
    MatProgressBarModule,
    FlexLayoutModule,
    NgxDatatableModule,
    ChartsModule,
    FileUploadModule,
  ]
})
export class PagesModule { }

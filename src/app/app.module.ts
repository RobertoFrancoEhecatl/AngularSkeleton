import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

/* Modulo para importar todos los componentes de angular material */
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularMaterialModule } from './Modules/angular-material/angular-material.module';
import { AdminModule } from './Modules/admin/admin.module';
import { AuthModule } from './Modules/auth/auth.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './Modules/admin/Components/admin/admin.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddEditUserComponent } from './Modules/admin/Components/users/add-edit-user/add-edit-user.component';
import { LandingPageModule } from './Modules/landing-page/landing-page.module';
import { MatTableModule } from '@angular/material/table';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SidebarComponent } from './Modules/admin/Components/sidebar/sidebar.component';
import { LayoutComponent } from './layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AddEditUserComponent,
    SidebarComponent,
    LayoutComponent,
  ],
  imports: [
    AppRoutingModule,
    AngularMaterialModule,
    AdminModule,
    AuthModule,
    BrowserAnimationsModule,
    LandingPageModule,
    MatTableModule,
    MatProgressBarModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FontAwesomeModule,
    HttpClientModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

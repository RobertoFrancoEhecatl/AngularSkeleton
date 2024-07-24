import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './Components/login/login.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ForgotPasswordComponent } from './Components/forgot-password/forgot-password.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';

@NgModule({
  declarations: [
    LoginComponent,
    ForgotPasswordComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    HttpClientModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    FontAwesomeModule,
  ],
})
export class AuthModule {}

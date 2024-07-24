import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselComponent } from './carousel/carousel.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    CarouselComponent
  ],
  imports: [
    CommonModule,
    AngularMaterialModule,
    FontAwesomeModule
  ],
  exports: [
    LandingPageComponent
  ]
})
export class LandingPageModule { }

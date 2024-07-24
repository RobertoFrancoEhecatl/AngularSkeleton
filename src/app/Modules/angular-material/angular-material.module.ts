import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatBadgeModule,
  ],
  exports: [
    MatCardModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatBadgeModule,
    MatInputModule,
    MatTableModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatSidenavModule,
    MatToolbarModule,
  ], // <== export the component you want to use in another module
})
export class AngularMaterialModule {}

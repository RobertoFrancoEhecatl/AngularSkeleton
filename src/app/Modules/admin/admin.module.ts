import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { UserCardComponent } from './Components/admin/SubComponents/user-card/user-card.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LogsComponent } from './Components/logs/logs.component';
import { UsersComponent } from './Components/users/users.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonTableComponent } from './Components/Skeleton/skeleton-table/skeleton-table.component';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VideosComponent } from './Components/Video/videos.component';
import { AddVideoComponent } from './Components/Video/add-video/add-video.component';
import { CapitulosSerieComponent } from './Components/Video/capitulos-serie/capitulos-serie.component';
import { AddEditCapComponent } from './Components/Video/add-edit-cap/add-edit-cap.component';
import { VideoTableDetailsComponent } from './Components/Video/video-table-details/video-table-details.component';
import { EpisodesTableComponent } from './Components/Video/capitulos-serie/episodes-table/episodes-table.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DROPZONE_CONFIG } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';

const DEFAULT_DROPZONE_CONFIG: DropzoneConfigInterface = {
  url: 'http://localhost:3000/upload',
  maxFilesize: 50,
  acceptedFiles: 'image/*',
};

@NgModule({
  declarations: [
    NavbarComponent,
    UserCardComponent,
    LogsComponent,
    UsersComponent,
    SkeletonTableComponent,
    VideosComponent,
    AddVideoComponent,
    CapitulosSerieComponent,
    AddEditCapComponent,
    VideoTableDetailsComponent,
    EpisodesTableComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularMaterialModule,
    FontAwesomeModule,
    NgxSkeletonLoaderModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    DropzoneModule,
  ],
  exports: [
    AdminRoutingModule,
    NavbarComponent,
    UserCardComponent,
    FontAwesomeModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [
    {
      provide: DROPZONE_CONFIG,
      useValue: DEFAULT_DROPZONE_CONFIG,
    },
  ],
})
export class AdminModule {}

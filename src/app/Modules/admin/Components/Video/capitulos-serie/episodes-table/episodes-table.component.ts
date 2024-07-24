import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { Video } from 'src/app/Interfaces/Video';
import { VideoService } from 'src/app/Services/Video/video.service';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'app-episodes-table',
  templateUrl: './episodes-table.component.html',
  styleUrls: ['./episodes-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class EpisodesTableComponent {

  pageSize = 15; // Tamaño de página predeterminado
  totalItems = 0; // Total de elementos
  pageIndex = 0; // Índice de página inicial

  dataSource: MatTableDataSource<Video> = new MatTableDataSource<Video>();
  columnsToDisplay = [];
  columnsToDisplayWithExpand = ['expand', 'titulo', 'subido_por', 'fecha_subida', 'tipo', 'estado_actual', 'actions'];
  expandedElement: PeriodicElement | null;

  videoList: Video[] = []
  currentVideo: Video = null;
  isTablet = false;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  VideoPaginator: Observable<any>;
  height: string;

  constructor(
    private _videoService: VideoService,
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {
    this.loadData()
    //this.columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
    this.getViewPort()
    this.setHight()
  }

  loadData() {
    this._videoService.getVideos().subscribe(data => {
      this.videoList = data as Video[]
      this.totalItems = this.videoList.length
      this.dataSource = new MatTableDataSource<Video>(this.videoList)
      this.changeDetectorRef.detectChanges();
      this.VideoPaginator = this.dataSource.connect()
      this.dataSource.paginator = this.paginator
    })
  }

  setVideo(video: Video) {
    if (this.currentVideo === video) {
      this.currentVideo = null
    }
    else {
      this.currentVideo = video
    }
  }

  getViewPort() {
    this.breakpointObserver.observe([Breakpoints.Tablet])
      .subscribe(result => {
        this.isTablet = result.matches;
        if (this.isTablet) {
          this.columnsToDisplayWithExpand = ['expand', 'titulo', 'subido_por', 'estado_actual', 'tipo', 'actions'];
        } else {
          this.columnsToDisplayWithExpand = ['expand', 'titulo', 'subido_por', 'fecha_subida', 'estado_actual', 'tipo', 'actions'];
        }
      });
  }

  setHight() {
    this.breakpointObserver.observe([
      Breakpoints.XSmall,
      Breakpoints.Small,
      Breakpoints.Medium,
      Breakpoints.Large,
      Breakpoints.XLarge
    ]).subscribe(result => {
      if (result.matches) {
        if (result.breakpoints[Breakpoints.XSmall]) {
          console.log('Extra pequeño dispositivo (menor que 600px)');
        }
        if (result.breakpoints[Breakpoints.Small]) {
          console.log('Pequeño dispositivo (600px - 959px)');
          this.height = '38vh'
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          console.log('Dispositivo mediano (960px - 1279px)');
          this.height = '35vh'
        }
        if (result.breakpoints[Breakpoints.Large]) {
          console.log('Dispositivo grande (1280px - 1919px)');
          this.height = '55vh'

        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          console.log('Extra grande dispositivo (mayor que 1920px)');
          this.height = '35vh'

        }
      }
    });
  }

  getColumnWidth(column: string) {
    switch (column) {
      case 'expand':
        return '10%';
      case 'titulo':
        return '20%';
      case 'subido_por':
        return '20%';
      case 'tipo':
          return '10%';
      case 'estado_actual':
        return '20%';
      case 'actions':
        return '15%';
      default:
        return 'auto'; // Ancho automático para columnas no especificadas
    }
  }
}

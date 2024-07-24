import { ChangeDetectorRef, Component, HostListener, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { VideoService } from 'src/app/Services/Video/video.service';
import { Video } from 'src/app/Interfaces/Video';
import { MatTableDataSource } from '@angular/material/table';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable } from 'rxjs';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}


@Component({
  selector: 'app-video-table-details',
  templateUrl: './video-table-details.component.html',
  styleUrls: ['./video-table-details.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class VideoTableDetailsComponent {
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
  height = ""

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;
  VideoPaginator: Observable<any>;

  constructor(
    private _videoService: VideoService,
    private changeDetectorRef: ChangeDetectorRef,
    private breakpointObserver: BreakpointObserver
  ) {
    this.loadData()
    //this.columnsToDisplayWithExpand = ['expand', ...this.columnsToDisplay];
    this.getViewPort()
    this.setHight();
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
          this.height = '55vh'
        }
        if (result.breakpoints[Breakpoints.Medium]) {
          console.log('Dispositivo mediano (960px - 1279px)');
          this.height = '45vh'
        }
        if (result.breakpoints[Breakpoints.Large]) {
          console.log('Dispositivo grande (1280px - 1919px)');
          this.height = '55vh'

        }
        if (result.breakpoints[Breakpoints.XLarge]) {
          console.log('Extra grande dispositivo (mayor que 1920px)');
          this.height = '55vh'

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

  @HostListener('window:orientationchange', ['$event'])
  onOrientationChange(event: Event) {
    // Aquí puedes ejecutar las acciones que desees cuando se detecte un cambio de orientación
    if (window.orientation === 0) {
      console.log('Dispositivo en orientación vertical');
    } else {
      console.log('Dispositivo en orientación horizontal');
    }
  }
}

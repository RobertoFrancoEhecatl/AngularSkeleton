import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { faArrowLeft, faPenToSquare, faPlus, faTrash, faVideo } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Video } from 'src/app/Interfaces/Video';
import { VideoService } from 'src/app/Services/Video/video.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

export interface VideoTable {
  "id": any,
  "Titulo": string,
  "Subido Por": string,
  "Fecha de Subida": Date,
  "Tipo": string,
}

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class VideosComponent {
  faArrowLeft = faArrowLeft

  dataSource: MatTableDataSource<VideoTable> = new MatTableDataSource<VideoTable>()
  columnsToDisplay = ['Titulo', 'Subido Por', 'Fecha de Subida'];
  columnsToDisplayWithExpand = [...this.columnsToDisplay, 'expand'];
  expandedElement: VideoTable | null;

  userPaginator: Observable<any>;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  pageSize = 15; // Tamaño de página predeterminado
  totalItems = 0; // Total de elementos
  pageIndex = 0; // Índice de página inicial

  videoList: Video[] = []

  panelOpenState = false;

  showSkeleton: boolean = true
  currentVideo: Video = null;
  constructor(
    private _videoService: VideoService,
    private changeDetectorRef: ChangeDetectorRef,
    private sanitizer: DomSanitizer
    ){ 
    this.getVideos()
    this.loadData();
    console.log(this.currentVideo)
  }

  getVideos(){
    try {
      this._videoService.getVideos().subscribe(videos => {
        let videoList = videos as Video[]
        this.dataSource = new MatTableDataSource<VideoTable>(this.setDataForTable(videoList))
        this.changeDetectorRef.detectChanges();
        this.userPaginator = this.dataSource.connect()
        this.dataSource.paginator = this.paginator
        console.log(this.userPaginator)
        console.log(this.dataSource.paginator)
        this.showSkeleton = false
      })
    } catch (error) {
      
    }
  }

  setDataForTable(videos: Video[]){
    let videosForTable: VideoTable[] = []
    videos.map(video =>{
      let videoForTable: VideoTable = {
        "id": video.id,
        "Fecha de Subida": video.fecha_subida,
        "Subido Por": video.subido_por,
        "Tipo": "",
        "Titulo": video.titulo,
      }
      videosForTable.push(videoForTable)
    })
    return videosForTable
  }

  showExpanded(expanded){
    console.log(expanded)
  }

  loadData(){
    this._videoService.getPaginatedVideos(this.pageIndex, this.pageSize).subscribe( data => {
      this.videoList = data.data as Video[]
      console.log(this.videoList)
    })
  }

  setData(video?: Video){
    console.log("It works")
    if(this.currentVideo === video){
      this.currentVideo = null
    }
    else {
      this.currentVideo = video
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadData();
  }

  sanitizeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

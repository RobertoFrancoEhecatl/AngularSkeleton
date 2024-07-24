import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Log } from 'src/app/Interfaces/Log';
import { LogService } from 'src/app/Services/LogService/log.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {
  rowIndices: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]; // Números de filas
  colIndices: any[] = [{class: 'col-1'}, {class: 'col-3'}, {class: 'col-5'}, {class: 'col-3'}]; // Números de columnas
  displayedColumns: string[] = ['usuario', 'nombre_log', 'descripción', 'fecha'];
  faArrowLeft = faArrowLeft

  done: boolean = false;

  userPaginator: Observable<any>;
  dataSource: MatTableDataSource<Log> = new MatTableDataSource<Log>()
  
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  constructor(
    private _logService: LogService,
    private changeDetectorRef: ChangeDetectorRef,
  ){ }

  ngOnInit(): void {
    this.getUsers()
    setTimeout(() => {
      console.log("Delayed for 1 second.");
      this.done = true
    }, 5000);
  }

  getUsers(){
    try{
      this._logService.getLogs().then(res => {
        this.dataSource = new MatTableDataSource<Log>(res as Log[])
        this.changeDetectorRef.detectChanges();
        this.userPaginator = this.dataSource.connect()
        this.dataSource.paginator = this.paginator
      })
    } catch(e){

    }
  }

}

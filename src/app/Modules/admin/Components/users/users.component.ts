import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { faArrowLeft, faEllipsisVertical, faUserPen, faUserPlus, faUserXmark } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { User } from 'src/app/Interfaces/User';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UserService } from 'src/app/Services/User/user.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements AfterViewInit {
  faUserPlus = faUserPlus
  faUserPen = faUserPen
  faUserXmark = faUserXmark
  faArrowLeft = faArrowLeft
  faEllipsisVertical = faEllipsisVertical
  userPaginator: Observable<any>;
  dataSource: MatTableDataSource<User> = new MatTableDataSource<User>()

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: any = MatPaginator;

  displayedColumns: string[] = ['id', 'Nombre', 'Email', 'Rol', 'Acciones'];
  showSkelenton: boolean;

  constructor(
    private dialog: MatDialog,
    private _userService: UserService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.getUsers()
    this.showSkelenton = true
  }

  ngAfterViewInit(): void {

  }

  getUsers() {
    try {
      this._userService.getUsers().subscribe(res => {
        if (res) {
          this.dataSource = new MatTableDataSource<User>(res as User[])
          this.changeDetectorRef.detectChanges();
          this.userPaginator = this.dataSource.connect()
          this.dataSource.paginator = this.paginator
        }
        setTimeout(() => {
          console.log("Delayed for 1 second.");
          this.showSkelenton = false
        }, 5000);
      })
    }
    catch (e) {

    }
  }

}

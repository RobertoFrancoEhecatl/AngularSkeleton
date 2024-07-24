import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDrawer, MatDrawerMode } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { faArrowRightFromBracket, faListUl, faMinimize, faUsers, faVideo } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from 'src/app/Services/AuthService/auth.service';
import { LocalService } from 'src/app/Services/Local/local.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit{
  faArrowRightFromBracket = faArrowRightFromBracket
  faMinimize = faMinimize
  routes = [
    {
      icon: faUsers,
      route: "usuarios",
      title: "Usuarios"
    },
    {
      icon: faListUl,
      route: "logs",
      title: "Registros",
    },
    {
      icon: faVideo,
      route: "videos",
      title: "Videos",
    },
  ]

  bandMinimize = true
  @ViewChild('drawer') drawer!: MatDrawer;
  mode = 'side'
  modoSidenav: MatDrawerMode = 'side'
  isTablet = false;

  constructor(
    private router: Router,
    private _authService: AuthService,
    private _localStorageService: LocalService,
    private breakpointObserver: BreakpointObserver
    ){ 
      this.getViewPort()
    }

  ngOnInit(): void {
    this.drawer.open();
  }

  logOut(){
    this._localStorageService.clearToken()
    this.router.navigate(["login"])
  }

  redirect(){
    this.router.navigate(["admin/usuarios"])
  }

  minimize(event){
    console.log(event)
    if(event > 1000){
      this.modoSidenav = 'side'
    }
    else {
      this.modoSidenav = 'over'
    }
    this.bandMinimize = !this.bandMinimize
  }

  getViewPort() {
    this.breakpointObserver.observe([Breakpoints.Tablet])
      .subscribe(result => {
        this.isTablet = result.matches;
        console.log("result", result)
        if (this.isTablet) {
          this.modoSidenav = 'over'
        } else {
          // Restaurar todas las columnas si no estamos en tablet
          this.modoSidenav = 'side'
        }
      });
  }
}

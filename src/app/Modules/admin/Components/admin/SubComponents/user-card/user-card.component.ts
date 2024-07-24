import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faCircleUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { User } from 'src/app/Interfaces/User';
import { LocalService } from 'src/app/Services/Local/local.service';
@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  faCircleUser = faCircleUser
  faArrowRightFromBracket = faArrowRightFromBracket

  currentUser: User = {
    id:"",
    userName: "",
    userEmail: "",
    userPassword: "",
    userRol: "",
    userPrimerApellido: "",
    userSegundoApellido: ""
  }

  constructor(
    private router: Router,
    private _localStorageService: LocalService
  ){ }

  ngOnInit(): void {
    this.currentUser.userRol = this._localStorageService.getJsonValue("userRole")
    this.currentUser.userName = this._localStorageService.getJsonValue("userName")
    console.log("user", this._localStorageService.getJsonValue("userName"))
  }

  logOut(){
    this._localStorageService.clearToken();
    this.router.navigate(['login'])
  }
}

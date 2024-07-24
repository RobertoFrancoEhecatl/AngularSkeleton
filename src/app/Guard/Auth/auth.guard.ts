import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LocalService } from 'src/app/Services/Local/local.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(
    private _localStorageService: LocalService,
    private router: Router
  ){ }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this._localStorageService.getJsonValue("isLoggedIn") === true){
        return true
      } else {
        this.router.navigate(['login'])
        return true;
      }
  }
  canActivateChild(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
  }
  
}

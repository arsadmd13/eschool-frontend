import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';

import { Auth } from '../../models/auth.model';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authenticationService: AuthenticationService) {}
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const url: string = state.url;
    const currentUser: Auth = this.authenticationService.currentUserValue;

    return this.checkLogin(currentUser, url);
  }
  
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return true;
    const url: string = state.url;
    const currentUser: Auth = this.authenticationService.currentUserValue;

    return this.checkLogin(currentUser, url);
  }
  
  checkLogin(user: Auth,url : string): boolean {
    if (user && localStorage.getItem('currentUser')) { return true; }
    // this.messageService.add({
    //   severity:'error', 
    //   summary: 'Session Expired', 
    //   detail: 'Login Session Expired! Please Login Again.'
    // });
    // console.log(user);
    this.authenticationService.redirectUrl = url;
    this.authenticationService.logout();
    return false;
  }
  
}

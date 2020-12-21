import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, tap, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

import { Auth } from '../../models/auth.model';

const backEndUrl = environment.url + "auth/";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = false;
  redirectUrl: string;
  private currentUserSubject: BehaviorSubject<Auth>;
  public currentUser: Observable<Auth>;

  constructor(private httpClient: HttpClient, private router: Router) {
      this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }

  login(credential): Observable<any> {
    let url = backEndUrl + "login";
    return this.httpClient.post(url, credential)
    // .pipe(
    //   map((user: Auth) => {
    //     if(user.status === 200) {
    //       localStorage.setItem("currentUser", JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //     }
    //     return user;
    //   }),
    //   catchError(this.handleError('register', {}))
    // )
  }

  register(userInfo): Observable<any> {
    // if(userInfo.userType == 1) {
    //   userInfo["roleId"] = "3";
    // } else {
    //   userInfo["roleId"] = "2";
    // }
    let url = backEndUrl + "register";
    return this.httpClient.put<any>(url, userInfo);
  }

  forgetPassword(emailId) {
    let url = backEndUrl + "forgetPassword";
    return this.httpClient.post(url, emailId);
  }

//   subModuleAccess(module, subModule) {
//     if(this.currentUserValue == undefined) {
//       this.router.navigate(['/']);
//     } else {
//       if(this.currentUserValue.userInfo.isAdmin === 1) {
//         return 1;
//       }
//       let permissions = JSON.parse(this.currentUserValue.roleInfo.rolePermissions);
//       if(permissions[module] === undefined || permissions[module].includes(subModule)) {
//         return 1;
//       } else {
//         return 0;
//       }
//     }
//   }

//   moduleAccess(module, toReturn = 0) {
//     if(this.currentUserValue == undefined) {
//       this.router.navigate(['/']);
//     } else {
//       if(this.currentUserValue != undefined && this.currentUserValue.userInfo.isAdmin === 1) {
//         return 1;
//       }
//       let permissions = JSON.parse(this.currentUserValue.roleInfo.rolePermissions);
//       if(permissions[module] === undefined || permissions[module].length === 0) {
//         if(toReturn) {
//           return 0;
//         } else {
//         //   this.messageService.add({
//         //     severity:'error', 
//         //     summary: 'Unauthorized Access!', 
//         //     detail: 'Please login to proceed!'
//         //   });
//         console.log("Unauth");
        
//           this.logout();
//         }
//       } else {
//         return 1;
//       }
//     }
//   }

  logout() {
    // remove user from local storage to log user out
    
    localStorage.removeItem('currentUser');
    this.router.navigate(['']);
  }

  private handleError<T>(operation = 'operation',result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      if(error.status === 500){
        result = error.error;
      }else{
        // this.messageService.add({
        //   severity:'error', 
        //   summary: 'Oops!', 
        //   detail: 'We are unable to process your request at the moment, please try again later!'
        // });
        // console.log("err from as");
      }
      return of(result as T);
    };
  }

  private log(message: string) {
    // console.log(message);
  }

}

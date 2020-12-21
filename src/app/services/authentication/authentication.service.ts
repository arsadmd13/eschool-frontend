import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Auth } from 'src/app/utils/models/auth.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, map } from 'rxjs/operators';
import { Router } from '@angular/router';

const backEndUrl = environment.url;

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  @Output() getUser: EventEmitter<any> = new EventEmitter();

  isLoggedIn = false;
  redirectUrl: string;
  private currentUserSubject: BehaviorSubject<Auth>;
  public currentUser: Observable<Auth>;

  constructor(public httpClient: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<Auth>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
   }


  public get currentUserValue(): Auth {
    return this.currentUserSubject.value;
  }

  create(data) {
      let url = backEndUrl + "auth/register";
      return this.httpClient.put(url, data);
  }

  read(data) {
    let url = backEndUrl + "user/login";
    return this.httpClient.post(url, data);
  }

  readall(data){
    let url = backEndUrl + "user/read";
    return this.httpClient.post(url, data);
  }

  update(data){
    let url = backEndUrl + "user/update";
    return this.httpClient.post(url, data);
  }

  // public get currentUserValue(): Auth {
  //   return this.currentUserSubject.value;
  // }

  login(credential): Observable<any> {
    let url = backEndUrl + "auth/login";
    return this.httpClient.post(url, credential)
    .pipe(
      map((user: Auth) => {
        if(user.status === 200) {
          localStorage.setItem("currentUser", JSON.stringify(user));
          this.currentUserSubject.next(user);
          this.getUser.emit(user)
        }
        return user;
      }),
      catchError(this.handleError('register', {}))
    )
  }

  register(userInfo): Observable<any> {
    // if(userInfo.userType == 1) {
    //   userInfo["roleId"] = "3";
    // } else {
    //   userInfo["roleId"] = "2";
    // }
    let url = backEndUrl + "auth/register";
    return this.httpClient.put<any>(url, userInfo);
  }

  forgetPassword(emailId) {
    let url = backEndUrl + "auth/forgetPassword";
    return this.httpClient.post(url, emailId);
  }

  logout() {
    // remove user from local storage to log user out
    
    localStorage.setItem('currentUser', null);
    this.currentUser = null;
    this.getUser.emit(null);
    location.href = "/"
    
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

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Injectable()
export class JwtTokenInterceptor implements HttpInterceptor {

  constructor(private authenticationService: AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    var token = null;
    
    if(this.authenticationService.currentUserValue){
      token = this.authenticationService.currentUserValue.token;
    }

    if(token!== null && token) {
      request = request.clone({
        setHeaders: {
          'Authorization': 'eschoolSecretTokenPre!' + token
        }
      });
    }

    if(!request.headers.has("skip")) {
      if (!request.headers.has('Content-Type')) {
        request = request.clone({
          setHeaders: {
            'content-type': 'application/json'
          },
          withCredentials: true
        });
      }
  
      request = request.clone({
        headers: request.headers.set('Accept', 'application/json'),
      }); 
    }

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        // console.log(event);
        
        if (event instanceof HttpResponse) {
          if(event.body.status === 401) {
            // this.messageService.add({
            //   severity:'error', 
            //   summary: 'Oops!', 
            //   detail: event.body.message
            // });
            // console.log(event.body.message);
            
            this.authenticationService.logout();
          } 
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        // console.log(error);
        
        if (error.status === 401) {
          // this.messageService.add({
          //   severity:'error', 
          //   summary: 'Unauthorized Access!', 
          //   detail: 'Please login to proceed!'
          // });
          // console.log(error);
            this.authenticationService.logout();
        }
        if (error.status === 400) {
          alert(error.error);
        }
        return throwError(error);
      }));
    }

}

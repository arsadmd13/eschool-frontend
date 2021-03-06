import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(public httpClient: HttpClient) { }

  create(data) {
      let url = "https://nameless-plateau-81910.herokuapp.com/user/register";
      return this.httpClient.post(url, data);
  }

  read(data) {
    let url = "https://nameless-plateau-81910.herokuapp.com/user/login";
    return this.httpClient.post(url, data);
  }

  readall(data){
    let url = "https://nameless-plateau-81910.herokuapp.com/user/read";
    return this.httpClient.post(url, data);
  }

  update(data){
    let url = "https://nameless-plateau-81910.herokuapp.com/user/update";
    return this.httpClient.post(url, data);
  }

}

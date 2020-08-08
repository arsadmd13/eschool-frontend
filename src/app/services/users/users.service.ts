import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  constructor(public httpClient: HttpClient) { }

  create(data) {
      let url = "https://nameless-plateau-81910.herokuapp.com/faculty/register";
      return this.httpClient.post(url, data);
  }

  read(data) {
    let url = "https://nameless-plateau-81910.herokuapp.com/faculty/read";
    return this.httpClient.post(url, data);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  backendUrl = environment.url + 'faculty/'

  constructor(public httpClient: HttpClient) { }

  create(data) {
      let url = this.backendUrl + "register";
      return this.httpClient.post(url, data);
  }

  read(data) {
    let url = this.backendUrl + "read";
    return this.httpClient.post(url, data);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  backendUrl = environment.url + "comment/"

  constructor(public httpClient: HttpClient) { }

  create(data) {
      let url = this.backendUrl + "add";
      return this.httpClient.post(url, data);
  }

  readAll() {
    let url = this.backendUrl + "read";
    return this.httpClient.get(url);
  }

}

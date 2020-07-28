import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CommentService {

  constructor(public httpClient: HttpClient) { }

  create(data) {
      let url = "hhttps://nameless-plateau-81910.herokuapp.com/comment/add";
      return this.httpClient.post(url, data);
  }

  readAll() {
    let url = "https://nameless-plateau-81910.herokuapp.com/comment/read";
    return this.httpClient.get(url);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class VideoService {

  constructor(public httpClient: HttpClient) { }

  readAll() {
    let url = "https://nameless-plateau-81910.herokuapp.com/video/read";
    return this.httpClient.get(url);
  }

}

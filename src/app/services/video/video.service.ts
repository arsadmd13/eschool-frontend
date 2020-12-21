import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class VideoService {

  backendUrl = environment.url + 'video/'

  constructor(public httpClient: HttpClient) { }

  readAll(data) {
    let url = this.backendUrl + "read";
    return this.httpClient.post(url, data);
  }

}

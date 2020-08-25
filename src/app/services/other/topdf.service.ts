import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class PdfService {

  constructor(public httpClient: HttpClient) { }

  convert(data) {
      console.log(data);
      
      let url = "http://localhost:3000/topdf";
      return this.httpClient.post(url, data);
  }

}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  url = environment.url + "cart/";

  constructor(public httpClient: HttpClient) { }

  create(data) {
      let url = this.url + "add";
      return this.httpClient.post(url, data);
  }

  read(data) {
    let url = this.url + "read";
    return this.httpClient.post(url, data);
  }

  delete(data) {
    let url = this.url + "delete";
    return this.httpClient.post(url, data);
  }

  pay(data) {
    let url = this.url + "add";
    // let url = "http://localhost:4242/create-payment-intent";
    return this.httpClient.post(url, data);
}

}

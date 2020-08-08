import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class CheckoutService {

  constructor(public httpClient: HttpClient) {}

  createOrder(data) {
    let url = "https://nameless-plateau-81910.herokuapp.com/order";
    return this.httpClient.post(url, data);
  }

  read(data) {
    let url = "https://nameless-plateau-81910.herokuapp.com/order/read";
    return this.httpClient.post(url, data);
  }

  updateOrder(data) {
    let url = "https://nameless-plateau-81910.herokuapp.com/order/update";
    return this.httpClient.post(url, data);
  }

  readall(data) {
    let url = "https://nameless-plateau-81910.herokuapp.com/order/readall";
    return this.httpClient.post(url, data);
  }

}

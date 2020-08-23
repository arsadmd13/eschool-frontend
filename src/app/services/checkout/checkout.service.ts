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
    //let url = "http://localhost:3000/order"
    return this.httpClient.post(url, data);
  }

  read(data) {
    let url = "https://nameless-plateau-81910.herokuapp.com/order/read";
    //let url = "http://localhost:3000/order/read"
    return this.httpClient.post(url, data);
  }

  updateOrder(data) {
    let url = "https://nameless-plateau-81910.herokuapp.com/order/update";
    //let url = "http://localhost:3000/order/update"
    return this.httpClient.post(url, data);
  }

  readall(data) {
    let url = "https://nameless-plateau-81910.herokuapp.com/order/readall";
    return this.httpClient.post(url, data);
  }

  transactions(data) {
    let url = "https://nameless-plateau-81910.herokuapp.com/order/transactions";
    //let url = "http://localhost:3000/order/transactions"
    return this.httpClient.post(url, data);
  }

}

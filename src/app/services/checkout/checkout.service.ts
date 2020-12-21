import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CheckoutService {

  backendUrl = environment.url + "order/"

  constructor(public httpClient: HttpClient) {}

  createOrder(data) {
    let url = this.backendUrl;
    //let url = "http://localhost:3000/order"
    return this.httpClient.post(url, data);
  }

  read(data) {
    let url = this.backendUrl + "read";
    //let url = "http://localhost:3000/order/read"
    return this.httpClient.post(url, data);
  }

  updateOrder(data) {
    let url = this.backendUrl + "update";
    //let url = "http://localhost:3000/order/update"
    return this.httpClient.post(url, data);
  }

  readall(data) {
    let url = this.backendUrl + "readall";
    return this.httpClient.post(url, data);
  }

  transactions(data) {
    let url = this.backendUrl + "transactions";
    //let url = "http://localhost:3000/order/transactions"
    return this.httpClient.post(url, data);
  }

}

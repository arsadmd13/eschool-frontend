import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class CartService {

  constructor(public httpClient: HttpClient) { }

  create(data) {
      let url = "https://nameless-plateau-81910.herokuapp.com/cart/add";
      return this.httpClient.post(url, data);
  }

  read(data) {
    let url = "https://nameless-plateau-81910.herokuapp.com/cart/read";
    return this.httpClient.post(url, data);
  }

  delete(data) {
    let url = "https://nameless-plateau-81910.herokuapp.com/cart/delete";
    return this.httpClient.post(url, data);
  }

}

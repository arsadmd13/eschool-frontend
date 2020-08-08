import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout/checkout.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  msg: string;
  userId: string;
  username: string;
  role: string;

  transactions = []

  constructor(public checkoutService: CheckoutService) { 
    this.role = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('userid');
    this.username = sessionStorage.getItem('username');

    if(this.role !== "0"){
      location.href = "/"
    }

    const data = {
      userId: this.userId,
      secTkn: sessionStorage.getItem('jwtToken')
    }

    this.checkoutService.read(data).subscribe(
      (res: any) => {
        if(res.status === 200) {
          this.transactions = res.orders;
        } else if(res.status === 404) {
          this.msg = "No Items Found!";
        } else {
          this.msg = res.message;
        }
      }, (error) => {
        this.msg = "We hit a road block while processing your request!"
      }
    );

  }

  ngOnInit(): void {
  }

}

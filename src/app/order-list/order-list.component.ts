import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../services/checkout/checkout.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {

  msg: string;
  userId: string;
  username: string;
  role: string;

  orders = []

  constructor(private route: ActivatedRoute, public checkoutService: CheckoutService) { 
    this.role = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('userid');
    this.username = sessionStorage.getItem('username');

    if(this.role !== "2"){
      location.href = "/"
    }

    const data = {
      secTkn: sessionStorage.getItem('jwtToken')
    }    

    this.checkoutService.readall(data).subscribe(
      (res: any) => {
        if(res.status === 200) {
          this.orders = res.orders;
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
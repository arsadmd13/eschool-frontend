import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  @ViewChild('loginForm', {static: true}) loginForm: ElementRef;

  msg: string;
  userId: string;
  username: string;
  role: string;
  selected: string;

  constructor(private route: ActivatedRoute, public cartService: CartService) { 

    this.role = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('userid');
    this.username = sessionStorage.getItem('username');


    if(this.role !== "0"){
      location.href = "/"
    }

  }

  ngOnInit(): void {

    this.loginForm.nativeElement.addEventListener("submit", (event) => {

      this.msg = "Processing your request..."

      console.log(this.selected);
      

      var plan = this.selected;  

      var data = {
        userId: this.userId,
        item: plan.split(" ")[1],
        amount: plan.split(" ")[1],
        fullplanname: plan,
        secTkn: sessionStorage.getItem('jwtToken')
      }      

      this.cartService.create(data).subscribe(
        (res: any) => {
          if(res.status == 200){
            this.msg = "Added to cart";
          } else {
            console.log(res);
            
            this.msg = "Unable to add the plan to the cart";
          }
        }, (error) => {
          this.msg = "We hit a road block while processing your request";
        }
      )

    });

  }

}

import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-plans',
  templateUrl: './plans.component.html',
  styleUrls: ['./plans.component.css']
})
export class PlansComponent implements OnInit {

  @ViewChild('planForm', {static: true}) planForm: ElementRef;

  msg: string;
  userId: string;
  username: string;
  role: string;
  subStatus: string;
  subPlan: string;
  selected: string;
  showplans: boolean;
  smsg: string = "";
  wmsg: string = "";
  dmsg: string = "";

  constructor(private route: ActivatedRoute, public cartService: CartService) { 

    this.role = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('userid');
    this.username = sessionStorage.getItem('username');
    this.subStatus = sessionStorage.getItem('subStatus');
    this.subPlan = sessionStorage.getItem('subPlan');
    

    this.showplans = true;

    if(this.role !== "0"){
      location.href = "/"
    }

    if(this.subStatus === "NN"){
      this.showplans = false;
      this.wmsg = "You don't need a subscription plan for our services!";
    }

  }

  ngOnInit(): void {
  }

  addToCart(){
    this.wmsg = "Processing your request..."      
  
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
              this.wmsg = "";
              this.dmsg = "";
              this.smsg = "Added to cart";
            } else {
              this.smsg = "";
              this.wmsg = "";
              this.dmsg = res.message
            }
          }, (error) => {
            this.smsg = "";
            this.wmsg = "";
            this.dmsg = "We hit a road block while processing your request";
          }
        )
  }

}

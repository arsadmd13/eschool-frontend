import { Component, OnInit, NgZone } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { CheckoutService } from '../services/checkout/checkout.service';
import { WindowRefService } from '../services/window/window-ref.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  msg: string;
  userId: string;
  username: string;
  role: string;
  email: string;
  buttonDisabled: boolean;
  orderId: string;
  enablegateway: boolean;

  cartItem : any = [];

  public rzp : any ; 

  public options : any;

  constructor(private route: ActivatedRoute, public cartService: CartService, public checkoutService: CheckoutService, private zone : NgZone, private winRef : WindowRefService) { 
    this.role = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('userid');
    this.username = sessionStorage.getItem('username');
    this.email = sessionStorage.getItem('email')

    if(this.role !== "0"){
      location.href = "/"
    }

    const data = {
      userId: this.userId,
      secTkn: sessionStorage.getItem('jwtToken')
    }

    this.cartService.read(data).subscribe(
      (res: any) => {
        if(res.status === 200) {          
          this.cartItem = res.items;
        } else if(res.status === 404) {
          this.msg = "No Items Found!";
          this.buttonDisabled = true;
        } else {
          this.msg = res.message;
          this.buttonDisabled = true;
        }
      }, (error) => {
        this.msg = "We hit a road block while processing your request!"
      }
    );

  }

  ngOnInit(): void {

    document.getElementById('checkoutbtn').addEventListener('click', (event) => {

      this.enablegateway = true
      this.buttonDisabled = true;
      
    })
  }

  rpay(){
    document.getElementById('checkoutbtn').innerText = "Loading...";

    this.enablegateway = false
  
      const data = {
        userId: this.userId,
        amount: document.getElementById('totalVal').innerText,
        item: document.getElementById('itemName').innerText,
        secTkn: sessionStorage.getItem('jwtToken'),
        gateway: "Razorpay"
      }

      this.checkoutService.createOrder(data).subscribe(
        (res: any) => {
          if(res.status === 200){            

            const oId = res.order.id;   
            this.orderId = oId;     

            this.options = {
                "key": "rzp_test_pXdODSmlRPHKap",
                "amount": "50000",
                "currency": "INR",
                "name": "Echool",
                "description": "Transaction",
                "image": "https://nameless-plateau-81910.herokuapp.com/img/logo.png",
                "order_id": res.order.id,
                "handler": this.paymentHandler.bind(this),
                "prefill": {
                    "name": this.username,
                    "email": this.email
                },
                "notes": {
                    "address": "Eschool (P) Ltd"
                },
                "theme": {
                    "color": "#a6dcef"
                },
                "modal": {
                  ondismiss:(()=>{
                      const cdata = {
                          userId: this.userId,
                          order_id: oId,
                          order_status: "Cancelled",
                          secTkn: sessionStorage.getItem('jwtToken')
                      }                      
                      this.checkoutService.updateOrder(cdata).subscribe(
                        (ures: any) => {
                          if(ures.status == 200){
                            document.getElementById('alert').classList.replace('show', 'hide');
                            document.getElementById('alert').classList.replace('hide', 'show');
                            if(document.getElementById('alert').innerText !== "Order Failed!")
                              document.getElementById('alert').innerText = "Order Cancelled!";
                            document.getElementById('checkoutbtn').innerText = "Checkout";
                          } else {
                            document.getElementById('alert').classList.replace('show', 'hide');
                            document.getElementById('alert').classList.replace('hide', 'show');
                            document.getElementById('alert').innerText !== "Order Cancelled!"
                            document.getElementById('checkoutbtn').innerText = "Checkout";
                          }
                        }, (error) => {
                          document.getElementById('alert').classList.replace('show', 'hide');
                          document.getElementById('alert').classList.replace('hide', 'show');
                          document.getElementById('alert').innerText = "Order Failed!";
                          document.getElementById('checkoutbtn').innerText = "Checkout";
                        }
                      )
                  })
                }
            };
            this.initPay()
          } else {
            this.msg = res.message;
          }
        }, (error) => {
          this.msg = "Unable to process your request ath the moment!";
        }
      )
  }

  spay(){

    this.enablegateway = false

    const data = {
      userId: this.userId,
      amount: document.getElementById('totalVal').innerText,
      item: document.getElementById('itemName').innerText,
      secTkn: sessionStorage.getItem('jwtToken'),
      gateway: "Stripe"
    }

    this.checkoutService.createOrder(data).subscribe(
      (res: any) => {
        if(res.status === 200){
          location.href = '/stripe/payment'
        } else {
          this.msg = "Error!"
        }
      }
    )
  }

  remove(){
    const data = {
      userId: this.userId,
      fullplanname: this.cartItem[0].fullplanname,
      secTkn: sessionStorage.getItem('jwtToken')
    }
    this.cartService.delete(data).subscribe(
      (res: any) => {
        if(res.status === 200){
          location.href = '/student/cart'
        } else {
          this.msg = 'Unable to remove item from the cart';
        }
      }
    )
    
  }

  initPay(): void {
    this.rzp=new this.winRef.nativeWidow['Razorpay'](this.options);
    this.rzp.open();
    this.rzp.on("payment.failed", () => {
      const cdata = {
        userId: this.userId,
        order_id: this.orderId,
        order_status: "Failed",
        gateway: "Razorpay",
        secTkn: sessionStorage.getItem('jwtToken')
      }
    
    this.checkoutService.updateOrder(cdata).subscribe(
      (ures: any) => {        
        if(ures.status == 200){
          document.getElementById('alert').classList.replace('show', 'hide');
          document.getElementById('alert').classList.replace('hide', 'show');
          document.getElementById('alert').innerText = "Order Failed!";
          document.getElementById('checkoutbtn').innerText = "Checkout";
        } else {
          document.getElementById('alert').classList.replace('show', 'hide');
          document.getElementById('alert').classList.replace('hide', 'show');
          document.getElementById('alert').innerText = "Order Failed!";
          document.getElementById('checkoutbtn').innerText = "Checkout";
        }
      }, (error) => {
        document.getElementById('alert').classList.replace('show', 'hide');
        document.getElementById('alert').classList.replace('hide', 'show');
        document.getElementById('alert').innerText = "Order Failed!";
        document.getElementById('checkoutbtn').innerText = "Checkout";
      }
    )
    })
  }
  paymentHandler(response: any ){
    this.zone.run( ()=> {
      // console.log("Success");
      const cdata = {
        userId: this.userId,
        order_id: response.razorpay_order_id,
        order_status: "Success",
        payment_id: response.razorpay_payment_id,
        signature: response.razorpay_signature,
        gateway: "Razorpay",
        secTkn: sessionStorage.getItem('jwtToken')
      }      

      this.checkoutService.updateOrder(cdata).subscribe(
        (ures: any) => {
          if(ures.status == 200){
            document.getElementById('alert').classList.replace('show', 'hide');
            document.getElementById('alert').classList.replace('hide', 'show');
            document.getElementById('alert').classList.replace('alert-danger', 'alert-success')
            document.getElementById('alert').innerHTML = "Order Succcessfull!<br>This page will automatically upade within 5 seconds";
            document.getElementById('checkoutbtn').innerText = "Checkout";
            var quota = this.cartItem[0].fullplanname.split(" ")[4]
            sessionStorage.setItem('subStatus', "AV");
            sessionStorage.setItem('subPlan', this.cartItem[0].fullplanname);
            sessionStorage.setItem('subQuota', quota);
            setTimeout(() => {
              location.href = "student/videos"
            }, 5000);
          } else {
            this.msg = "Order Failed!";
            document.getElementById('checkoutbtn').innerText = "Checkout";
          }
        }, (error) => {
          this.msg = "Order Failed!";
          document.getElementById('checkoutbtn').innerText = "Checkout";
      }
    )
    });
  }

}

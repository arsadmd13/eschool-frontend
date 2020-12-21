import { Component, OnInit, NgZone } from '@angular/core';
import { CartService } from '../services/cart/cart.service';
import { CheckoutService } from '../services/checkout/checkout.service';
import { WindowRefService } from '../services/window/window-ref.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
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
  user: any;
  subStatus: string;

  public rzp : any ; 

  public options : any;

  constructor(private router: Router,
              public cartService: CartService, 
              public checkoutService: CheckoutService, 
              private authenticationService: AuthenticationService,
              private zone : NgZone, 
              private winRef : WindowRefService) { 
    // this.role = sessionStorage.getItem('role');
    // this.userId = sessionStorage.getItem('userid');
    // this.username = sessionStorage.getItem('username');
    // this.email = sessionStorage.getItem('email')

    // if(this.role !== "0"){
    //   location.href = "/"
    // }

    this.user = this.authenticationService.currentUserValue?.user;

    if(this.user.role !== "0"){
      // setTimeout(() => {
        this.router.navigate(['/home'])
      // }, 2000);
    }

    this.subStatus = this.user.subscription.status;


    const data = {
      userId: this.user._id,
    }

    this.cartService.read(data).subscribe(
      (res: any) => {
        if(res.status === 200) {          
          this.cartItem = res.items;
        } else if(res.status === 404) {
          this.showAlert("No Items Found!");
          this.buttonDisabled = true;
        } else {
          this.showAlert(res.message);
          this.buttonDisabled = true;
        }
      }, (error) => {
        this.showAlert("Unable to process your request at the moment! PLease try again later.");
      }
    );

  }

  ngOnInit(): void {

    document.getElementById('checkoutbtn').addEventListener('click', (event) => {

      this.enablegateway = true
      this.buttonDisabled = true;
      document.getElementById('checkoutbtn').style.display = "none"
      
    })
  }

  rpay(){
    // document.getElementById('checkoutbtn').innerText = "Loading...";

    this.showAlert("Please wait while we transfer you to the payment gateway...");

    this.enablegateway = false
  
      const data = {
        userId: this.user._id,
        amount: this.cartItem[0].amount,
        item: this.cartItem[0].item,
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
                          userId: this.user._id,
                          order_id: oId,
                          order_status: "Cancelled",
                      }                      
                      this.checkoutService.updateOrder(cdata).subscribe(
                        (ures: any) => {
                          if(ures.status == 200){
                            if(document.getElementById('alert').innerText !== "Order Failed!")
                              this.showAlert("Order Cancelled");
                            else
                              this.showAlert("Order Failed");
                          } else {
                            this.showAlert("Order Failed");
                          }
                        }, (error) => {
                          this.showAlert("Order Failed");
                        }
                      )
                  })
                }
            };
            this.initPay()
          } else {
            this.enablegateway = true;
            this.showAlert(res.message);
          }
        }, (error) => {
          this.enablegateway = true;
          this.showAlert("Unable to process your request at the moment! PLease try again later.");
        }
      )
  }

  spay(){

    this.enablegateway = false

    const data = {
      userId: this.user._id,
      amount: this.cartItem[0].amount,
      item: this.cartItem[0].item,
      gateway: "Stripe"
    }

    this.checkoutService.createOrder(data).subscribe(
      (res: any) => {
        if(res.status === 200){
          // console.log('stripe/payment/' + res.receipt_id);
          
          this.router.navigate(['stripe/payment/' + res.receipt_id])
        } else {
          this.showAlert("Unable to process your request at the moment! PLease try again later.");
        }
      }
    )
  }

  remove(){
    const data = {
      userId: this.userId,
      fullplanname: this.cartItem[0].fullplanname,
    }
    this.cartService.delete(data).subscribe(
      (res: any) => {
        if(res.status === 200){
          
        } else {
          this.showAlert("Unable to process your request at the moment! PLease try again later.");
        }
      }
    )
    
  }

  initPay(): void {
    this.rzp=new this.winRef.nativeWidow['Razorpay'](this.options);
    this.rzp.open();
    this.rzp.on("payment.Failed", () => {
      const cdata = {
        userId: this.user._id,
        order_id: this.orderId,
        order_status: "Failed",
        gateway: "Razorpay",
      }
    
    this.checkoutService.updateOrder(cdata).subscribe(
      (ures: any) => {        
        if(ures.status == 200){
          this.showAlert("Order Failed!");
        } else {
          this.showAlert("Order Failed!");
        }
      }, (error) => {
        this.showAlert("Order Failed!");
      }
    )
    })
  }
  paymentHandler(response: any ){
    this.zone.run( ()=> {
      // console.log("Success");
      const cdata = {
        userId: this.user._id,
        order_id: response.razorpay_order_id,
        order_status: "Success",
        payment_id: response.razorpay_payment_id,
        signature: response.razorpay_signature,
        gateway: "Razorpay",
      }      

      this.checkoutService.updateOrder(cdata).subscribe(
        (ures: any) => {
          if(ures.status == 200){
            document.getElementById('alert').classList.replace('alert-danger', 'alert-success');
            document.getElementById('alert').classList.replace('alert-warning', 'alert-success');
            this.showAlert("Order Successfull!");
            // document.getElementById('alert').innerHTML = "Order Succcessfull!<br>This page will automatically upade within 5 seconds";
            setTimeout(() => {
              this.router.navigate(['/videos'])
            }, 5000);
          } else {
            this.showAlert("Order Failed!");
          }
        }, (error) => {
          this.showAlert("Order Failed!");
      }
    )
    });
  }

  showAlert(msg){
    document.getElementById('alert').classList.replace('show', 'hide');
    document.getElementById('alert').classList.replace('hide', 'show');
    document.getElementById('alert').innerText = msg;
  }

}

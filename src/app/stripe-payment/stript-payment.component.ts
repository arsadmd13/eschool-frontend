// import { Component, AfterViewInit, OnDestroy, ViewChild, ElementRef, ChangeDetectorRef, OnInit } from '@angular/core';
// import { CartService } from '../services/cart/cart.service';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
// import {loadStripe} from '@stripe/stripe-js';
// import {
//   StripeCardElementOptions,
//   StripeElementsOptions
// } from '@stripe/stripe-js';
 
// import { StripeService, StripeCardComponent } from 'ngx-stripe';

 
// @Component({
//   selector: 'app-sck',
//   templateUrl: './sck.component.html',
//   styleUrls: ['./sck.component.css']
// })
// export class SckComponent implements OnInit {

//   @ViewChild(StripeCardComponent) card: StripeCardComponent;

//   cardOptions: StripeCardElementOptions = {
//     style: {
//       base: {
//         iconColor: '#666EE8',
//         color: '#31325F',
//         fontWeight: '300',
//         fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
//         fontSize: '18px',
//         '::placeholder': {
//           color: '#CFD7E0'
//         }
//       }
//     }
//   };
 
//   elementsOptions: StripeElementsOptions = {
//     locale: 'es'
//   };

//   // constructor(private cd: ChangeDetectorRef, private elements: StripeCardElementOptions) {}

//   // async ngOnInit(){
//   //   this.stripe = await loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');
//   // }

//   // ngAfterViewInit() {
//   //   // this.card = this.elements.
//   //   // this.card.mount(this.cardInfo.nativeElement);
//   //   // this.card.addEventListener('change', this.cardHandler);
//   // }
  
//   // ngOnDestroy() {
//   //   this.card.removeEventListener('change', this.cardHandler);
//   //   this.card.destroy();
//   // }
  
//   // onChange({ error }) {
//   //   if (error) {
//   //     this.error = error.message;
//   //   } else {
//   //     this.error = null;
//   //   }
//   //   this.cd.detectChanges();
//   // }
//   // async onSubmit(form: NgForm) {
//   //   const { token, error } = await this.stripe.createToken(this.card);
//   //   if (error) {
//   //     console.log('Something is wrong:', error);
//   //   } else {
//   //     console.log('Success!', token);
//   //     //<span class="code-annotation">;// ...send the token to the your backend to process the charge</span>
//   //   }
//   // }

//   stripeTest: FormGroup;

//   paymentRequestOptions = {
//     country: 'ES',
//     currency: 'eur',
//     total: {
//       label: 'Demo Total',
//       amount: 1099,
//     },
//     requestPayerName: true,
//     requestPayerEmail: true,
//   };
 
//   constructor(private fb: FormBuilder, private stripeService: StripeService, private cartService: CartService) {}
 
//   ngOnInit(): void {
//     this.stripeTest = this.fb.group({
//       name: ['', [Validators.required]]
//     });
//   }
 
//   createToken(): void {
//     const name = this.stripeTest.get('name').value;

//     // this.data = {
//     //   type: 'card',
//     // card: this.cardOptions,
//     // billing_details: {
//     //   name: 'Jenny Rosen',
//     // },
//     // }

//     const data = {
//       amount: "10000",
//       currency: "inr",
//       name: "abc"
//     }

    
    
//     this.stripeService
//     .createSource(data)
//     .subscribe((result) => {
//       if (result) {
//         // Use the token
//         console.log(result.token.id);
//       } else if (result.error) {
//         // Error creating the token
//         console.log(result.error.message);
//       }
//     });
//     // this.cartService.pay({}).subscribe(
//     //   (res: any) => {
//     //     console.log(res);
//     //     // this.stripeService.
        
//     //   }
//     // )
//   }

// }

// // import { Component } from "@angular/core"
// // import { StripeToken, StripeSource } from "stripe-angular"
 
// // const template=
// // `
// // <div *ngIf="invalidError" style="color:red">
// //   {{ invalidError.message }}
// // </div>
 
// // <stripe-card
// //   #stripeCard
// //   (catch) = "onStripeError($event)"
// //   [(invalid)] = "invalidError"
// //   (cardMounted) = "cardReady"
// //   (tokenChange) = "setStripeToken($event)"
// //   (sourceChange) = "setStripeSource($event)"
// // ></stripe-card>
 
// // <button type="button" (click)="stripeCard.createToken(extraData)">createToken</button>
// // `
 
// // @Component({
// //   selector: "app-suck",
// //   template: template
// // }) export class SckComponent{
// //   cardReady = false;
// //   invalidError = false
// //   extraData = {
// //     "name": "null",
// //     "address_city": "null",
// //     "address_line1": "null",
// //     "address_line2": "null",
// //     "address_state": "null",
// //     "address_zip": "null"
// //   };
 
// //   onStripeInvalid( error:Error ){
// //     console.log('Validation Error', error)
// //   }
 
// //   setStripeToken( token:StripeToken ){
// //     console.log('Stripe token', token)
// //   }
 
// //   setStripeSource( source:StripeSource ){
// //     console.log('Stripe source', source)
// //   }
 
// //   onStripeError( error:Error ){
// //     console.error('Stripe error', error)
// //   }
// // }



import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CheckoutService } from '../services/checkout/checkout.service';

import { StripeService, StripeCardNumberComponent, StripeCardComponent } from 'ngx-stripe';
import {
  StripeCardElementOptions,
  StripeElementsOptions,
  PaymentIntent,
} from '@stripe/stripe-js';
import { AuthenticationService } from '../services/authentication/authentication.service';


@Component({
  selector: 'app-stript-payment',
  templateUrl: './stript-payment.component.html',
  styleUrls: ['./stript-payment.component.scss'],
})
export class StripePaymentComponent implements OnInit {
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
  @ViewChild(StripeCardComponent) cardd: StripeCardComponent;
  @ViewChild('card', {static: true}) carddd: StripeCardNumberComponent;

  user: any;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#000000',
        color: '#000000',
        fontWeight: '300',
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#000000',
        },
      },
      invalid: {
        iconColor: '#fa755a',
        color: '#fa755a'
      }
    },
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
  };

  stripeTest: FormGroup;

  currentAmt: string;
  clientSecretId: string
  msg: string;
  order_id: string;

  receiptId: string; 

  constructor(
    private activatedRoute: ActivatedRoute,
    private http: HttpClient,
    private fb: FormBuilder,
    private stripeService: StripeService,
    private checkoutService: CheckoutService,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    
    
    // this.activatedRoute.queryParams.subscribe(params => {
    //   console.log(params);
      
    //   this.receiptId = params['receiptId'];
    //   console.log(this.receiptId); // Print the parameter to the console. 
    // });
  }

  ngOnInit(): void {

    this.user = this.authenticationService.currentUserValue.user;

    this.activatedRoute.paramMap.subscribe(params => {
      this.receiptId = params.get('receiptId');
      // console.log(this.receiptId);   
      this.fetchOrder();
    });
    

    this.stripeTest = this.fb.group({
      name: ['Angular v10', [Validators.required]],
      amount: [1001, [Validators.required, Validators.pattern(/\d+/)]],
    });

    
  }

  fetchOrder(){
    const rdata = {
      userId: this.user._id,
      receipt_id: this.receiptId 
    }

    this.checkoutService.read(rdata).subscribe(
      (res: any) => {        
        if(res.status === 200){          
          this.currentAmt = res.order.amount + " " + res.order.currency;
          this.order_id = res.order.order_id;
          this.clientSecretId = res.order.others.stripe_client_secret;
        } else {
          // this.showErrorAlert(res.message)
          this.router.navigate(['/'])
        }
      }
    ), (error) => {
      // this.showErrorAlert("Unable to process your request at the moment! PLease try again later.");
      this.router.navigate(['/'])
    }
  }

  pay(): void {
    document.getElementById('cardElement').classList.replace('borderClass--invalid', 'borderClass--valid')
    let paymentDetails = {
      payment_method: {
        card: this.cardd.element,
        billing_details: {
          name: this.stripeTest.get('name').value,
        },
      },
    }
    if (this.stripeTest.valid) {
      this.stripeService.confirmCardPayment(this.clientSecretId, paymentDetails).subscribe(
        (result) => {
          if (result.error) {
            console.log(result.error.message);
            if(result.error.type === "validation_error"){
              document.getElementById('cardElement').classList.replace('borderClass--valid', 'borderClass--invalid')
              this.showWarnAlert("Please fill in all the mandatory fields!")
              return;
            }

            const data = {
              userId: this.user._id,
              order_id: this.order_id,
              order_status: "Failed",
              gateway: "Stripe"
            }

            this.checkoutService.updateOrder(data).subscribe(
              (res: any) => {
                if(res.status === 200){
                  this.showErrorAlert("Order Failed!")
                } else {
                  this.showErrorAlert(res.message)
                }
              }, (error) => {
                this.showErrorAlert("Order Failed!")
              }
            )
          } else {
            // The payment has been processed!
            if (result.paymentIntent.status === 'succeeded') {
              const data = {
                userId: this.user._id,
                order_id: this.order_id,
                order_status: "Success",
                gateway: "Stripe"
              }

              this.checkoutService.updateOrder(data).subscribe(
                (res: any) => {
                  if(res.status === 200){
                    // document.getElementById('alert').classList.replace('alert-danger', 'alert-success');
                    this.showSuccessAlert("Order Successfull!")
                    setTimeout(() => {
                      this.router.navigate(['/videos'])
                    }, 2000)
                  } else {
                    this.showErrorAlert(res.message)
                  }
                }, (error) => {
                  this.showErrorAlert("Order Failed!")
                }
              )
            }
          }
        }, (error) => {
          this.showErrorAlert("Order Failed!")
        })
    } else {
      // console.log(this.stripeTest);
      this.showWarnAlert("Invalid Card Details!")
    }
  }

  createPaymentIntent(amount: number): Observable<PaymentIntent> {
    return this.http.post<PaymentIntent>(
      `http://localhost:4242/create-payment-intent`,
      { amount }
    );
  }

  createToken(): void {
    // console.log(this.cardd.element);
    
    // const name = this.stripeTest.get('name').value;
    // this.stripeService.createToken(this.card.element, { name }).subscribe((result) => {
    //   if (result.token) {
    //     // Use the token
    //     console.log(result.token.id);
    //   } else if (result.error) {
    //     // Error creating the token
    //     console.log(result.error.message);
    //   }
    // });
  }

  check(){
    console.log("jhgfdxcv");
    
  }

  @ViewChild('successAlert', { static: true }) successAlert: ElementRef;
  @ViewChild('warnAlert', { static: true }) warnAlert: ElementRef;
  @ViewChild('errorAlert', { static: true }) errorAlert: ElementRef;

  successMsg = "";
  warnMsg = "";
  errorMsg = "";

  closeSuccessAlert() {
    this.successAlert.nativeElement.classList.remove('show');
  }

  showSuccessAlert(msg) {
    this.closeAllAlerts();
    this.successMsg = msg;
    this.successAlert.nativeElement.classList.add('show');
  }

  closeWarnAlert() {
    this.warnAlert.nativeElement.classList.remove('show');
  }

  showWarnAlert(msg) {
    this.closeAllAlerts();
    this.warnMsg = msg;
    this.warnAlert.nativeElement.classList.add('show');
  }

  closeErrorAlert() {
    this.errorAlert.nativeElement.classList.remove('show');
  }

  showErrorAlert(msg) {
    this.closeAllAlerts();
    this.errorMsg = msg;
    this.errorAlert.nativeElement.classList.add('show');
  }

  closeAllAlerts(){
    this.errorAlert.nativeElement.classList.remove('show');
    this.warnAlert.nativeElement.classList.remove('show');
    this.successAlert.nativeElement.classList.remove('show');
  }
}
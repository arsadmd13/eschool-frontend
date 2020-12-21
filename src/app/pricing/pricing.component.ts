import { Route } from '@angular/compiler/src/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.scss']
})

export class PricingComponent implements OnInit{

  form: FormGroup;
  username: string;
  user: any = null;
  btnDef = null;

  constructor(private fb: FormBuilder,
            private router: Router,
              private athenticationService: AuthenticationService,
              private cartService: CartService) {
      this.user = this.athenticationService.currentUserValue?.user;
      console.log(this.user);
      
  }

  ngOnInit(){
      this.btnDef = this.user === null || this.user === undefined ? 'Sign Up' : 'Subscribe';
  }

  addToCart(plan){
        if(this.user === null || this.user === undefined){
            this.router.navigate(['/register']);
            return;
        }
        this.showWarnAlert("Processing your request...");

        var planName = plan === 1 ? 'basic' : plan === 2 ? 'standard' : 'premium';
        var planFullName = planName.charAt(0).toUpperCase() + planName.slice(1)
        var price = plan === 1 ? 7.99 : plan === 2 ? 19.99 : 149.99;
  
        var data = {
          userId: this.user._id,
          item: planName,
          amount: price,
          fullplanname: planName.charAt(0).toUpperCase() + planName.slice(1),
        //   secTkn: sessionStorage.getItem('jwtToken')
        }      
  
        this.cartService.create(data).subscribe(
          (res: any) => {
            if(res.status == 200){
                // this.showSuccessAlert('Added!')  
                this.router.navigate(['/cart'])
            } else {
                this.showErrorAlert('Oops!, we are unable to process your request at the moment.')
            }
          }, (error) => {
            this.showErrorAlert('Oops!, we are unable to process your request at the moment.')
          }
        )
  }
//     this.form = this.fb.group({
//       className: ['', Validators.required],
//       classAccess: ['', Validators.required],
//       classDate: ['', Validators.required],
//       classTime: ['', Validators.required]
//     })
//   }

//   submit(){
//     console.log(this.form.value)
//   }

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

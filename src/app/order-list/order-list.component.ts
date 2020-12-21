import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CheckoutService } from '../services/checkout/checkout.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  msg: string;
  userId: string;
  username: string;
  role: string;

  orders = [];
  user: any;

  constructor(private router: Router, public checkoutService: CheckoutService, private authenticationService: AuthenticationService) { 
    this.user = this.authenticationService.currentUserValue?.user;

    if(this.user.role !== "2"){
      this.router.navigate(['/'])
    }

    const data = {
      // secTkn: sessionStorage.getItem('jwtToken')
    }    

    this.checkoutService.readall(data).subscribe(
      (res: any) => {
        if(res.status === 200) {
          this.orders = res.orders;
        } else if(res.status === 404) {
          this.showWarnAlert("No Items Found!");
        } else {
          this.showErrorAlert(res.message);
        }
      }, (error) => {
        this.showErrorAlert("We hit a road block while processing your request!")
      }
    );

  }

  ngOnInit(): void {
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

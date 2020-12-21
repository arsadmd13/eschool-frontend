import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {

  @ViewChild('passOldpassword', {static: true}) passOldpassword: ElementRef;
  @ViewChild('passNewpassword', {static: true}) passNewpassword: ElementRef;
  @ViewChild('passCnewpassword', {static: true}) passCnewpassword: ElementRef;
  @ViewChild('passForm', {static: true}) passForm: ElementRef;
  @ViewChild('passReset', {static: true}) passReset: ElementRef;

  msg: string;
  userId: string;
  username: string;
  role: string;

  constructor(private router: Router, public authenticationService: AuthenticationService) { 
    // this.role = sessionStorage.getItem('role');
    // this.userId = sessionStorage.getItem('userid');
    // this.username = sessionStorage.getItem('username');

    // if(this.role === undefined || this.role == null){
    //   location.href = '/'
    // }

    // let path = this.route.snapshot.url.join('/');

    // if(path == "student/change-password"){
    //   if(this.role == "1"){
    //     location.href = "/faculty/home";
    //   } else if (this.role == "2"){
    //     location.href = "/admin/home";
    //   }
    // } else if(path == "faculty/change-password"){
    //   if(this.role == "0"){
    //     location.href = "/student/home";
    //   } else if (this.role == "2"){
    //     location.href = "/admin/home";
    //   }
    // } else if(path == "admin/change-password"){
    //   if(this.role == "1"){
    //     location.href = "/faculty/home";
    //   } else if (this.role == "0"){
    //     location.href = "/student/home";
    //   }
    // }
  }

  ngOnInit(): void {

    this.passForm.nativeElement.addEventListener("submit", (event) => {
      
      const data = {
        userId: this.authenticationService.currentUserValue?.user._id,
        oldpassword: this.passOldpassword.nativeElement.value,
        newpassword: this.passNewpassword.nativeElement.value,
        newpassword2: this.passCnewpassword.nativeElement.value,
      }     
      
      this.showSuccessAlert("Pleasw wait while we process your request...");

      this.authenticationService.update(data).subscribe(
        (res: any) => {
          if(res.status === 200){
            this.showSuccessAlert("Password Updated!");
            setTimeout(() => {
              this.authenticationService.logout();
            }, 2000)
          } else {
            this.showErrorAlert(res.message);
          }
        }, (error) => {
          this.showErrorAlert("We hit a road block while processing your request!");
        }
      )
    })
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

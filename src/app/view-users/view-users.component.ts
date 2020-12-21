import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.scss']
})
export class ViewUsersComponent implements OnInit {

  msg: string;
  userId: string;
  username: string;
  role: string;
  caption: string;
  wmsg: string = "";
  dmsg: string = "";

  fusers = []
  susers = []

  user: any;

  constructor(public authenticationService: AuthenticationService,
              private router: Router) { 
    this.user = this.authenticationService.currentUserValue?.user;

    if(this.user.role !== "2"){
      this.router.navigate(['/'])
    }

    // this.role = sessionStorage.getItem('role');
    // this.userId = sessionStorage.getItem('userid');
    // this.username = sessionStorage.getItem('username');

    // if(this.role !== "2"){
    //   location.href = "/"
    // }

    // this.showWarnAlert("Plase wait while we fetch data from our server...");

    const data = {
      // secTkn: sessionStorage.getItem('jwtToken')
    }

    this.authenticationService.readall(data).subscribe(
      (res: any) => {
        if(res.status === 200) {
          this.fusers = res.fusers;
          this.susers = res.susers;
          this.caption = "NN-'Not Needed';    NA-'Not Available';    AV-'Available'";
          if(this.fusers.length === 0 && this.susers.length === 0){
            this.showWarnAlert("No users found!");
          } else {
            this.wmsg = "";
            if(this.fusers.length === 0)
              this.showWarnAlert("No users found in faculty section!");
            if(this.susers.length === 0)
              this.showWarnAlert("No users found in student section!");
          }
        } else {
          this.showErrorAlert(res.message);
        }
      }, (error) => {
        this.showErrorAlert("We hit a road block while processing your request!");
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

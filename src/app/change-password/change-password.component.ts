import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
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

  constructor(private route: ActivatedRoute, public authenticationService: AuthenticationService) { 
    this.role = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('userid');
    this.username = sessionStorage.getItem('username');

    if(this.role === undefined || this.role == null){
      location.href = '/'
    }

    let path = this.route.snapshot.url.join('/');

    if(path == "student/change-password"){
      if(this.role == "1"){
        location.href = "/faculty/home";
      } else if (this.role == "2"){
        location.href = "/admin/home";
      }
    } else if(path == "faculty/change-password"){
      if(this.role == "0"){
        location.href = "/student/home";
      } else if (this.role == "2"){
        location.href = "/admin/home";
      }
    } else if(path == "admin/change-password"){
      if(this.role == "1"){
        location.href = "/faculty/home";
      } else if (this.role == "0"){
        location.href = "/student/home";
      }
    }
  }

  ngOnInit(): void {

    this.passForm.nativeElement.addEventListener("submit", (event) => {

      event.preventDefault();
      document.getElementById('alert').classList.replace('alert-danger', 'alert-warning');
      this.msg = "Please wait while we process your request...";

      const data = {
        userId: this.userId,
        oldpassword: this.passOldpassword.nativeElement.value,
        newpassword: this.passNewpassword.nativeElement.value,
        newpassword2: this.passCnewpassword.nativeElement.value,
        secTkn: sessionStorage.getItem('jwtToken')
      }      

      this.authenticationService.update(data).subscribe(
        (res: any) => {
          if(res.status === 200){
            document.getElementById('alert').classList.replace('alert-warning', 'alert-success');
            this.msg = "Password Updated!";
            this.passReset.nativeElement.click();
            location.href = "/logout";
          } else {
            document.getElementById('alert').classList.replace('alert-warning', 'alert-danger');
            this.msg = res.message;
          }
        }, (error) => {
          document.getElementById('alert').classList.replace('alert-warning', 'alert-danger');
          this.msg = "We hit a road block while processing your request!";
        }
      )
    })
  }

}

import { Component, OnInit, ElementRef, ViewChild } from "@angular/core"
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  public hoverImg: string = '<img src="https://mdbootstrap.com/img/logo/mdb192x192.jpg"/>';


  @ViewChild('loginEmail', {static: true}) loginEmail: ElementRef;
  @ViewChild('loginPassword', {static: true}) loginPass: ElementRef;
  @ViewChild('loginForm', {static: true}) loginForm: ElementRef;
  @ViewChild('loginReset', {static: true}) loginReset: ElementRef;

  alternate: string;
  msg: string;
  role: string;
  noregister: boolean;

  constructor(private route: ActivatedRoute, public authenticationService: AuthenticationService){

    this.role = sessionStorage.getItem('role');
    this.noregister = false;

    if(this.role === "1"){
      location.href = "faculty/home";
    } else if(this.role === "0"){
      location.href = "student/home"
    } else if(this.role === "2"){
      location.href = "admin/home"
    }

    let path = this.route.snapshot.url.join('/');

    if(path === "faculty/login"){
      this.alternate = "/faculty/register";
    } else if(path === "student/login"){
      this.alternate = "/student/register";
    } else {
      this.noregister = true;
    }
  }

  ngOnInit(): void {

    this.loginForm.nativeElement.addEventListener("submit", (event) => {

      event.preventDefault();

      this.msg = "Please wait while we process your request...";

      let path = this.route.snapshot.url.join('/');

      let role = 0;

      if(path === "faculty/login"){
        role = 1;
      } else if(path === "admin/login") {
        role = 2;
      } else {
        role = 0;
      }

      let data = {
        email: this.loginEmail.nativeElement.value,
        password: this.loginPass.nativeElement.value,
        role: role
      };

      console.log(data);


      this.authenticationService.read(data).subscribe(
        (res: any) => {

          if(res.status === 200) {

            this.loginReset.nativeElement.click();
            this.msg = "Login Successfull!";

            sessionStorage.setItem('userid', res.user._id);
            sessionStorage.setItem('username', res.user.name);
            sessionStorage.setItem('role', res.user.role);
            sessionStorage.setItem('email', res.user.email);
            sessionStorage.setItem('subStatus', res.user.subscription.status)
            sessionStorage.setItem('subPlan', res.user.subscription.plan);
            sessionStorage.setItem('jwtToken', res.token);

            if(res.user.subscription.status !== "NA" || res.user.subscription.status !== "NN"){
              var quota = res.user.subscription.plan.split(" ")[4];
              sessionStorage.setItem('subQuota', quota);
            }

            setTimeout(() => {
              if(role === 1) {
                location.href = "/faculty/home";
              } else if(role === 2) {
                location.href = "/admin/home";
              } else {
                if(res.user.subscription.status === "NA"){
                  location.href = "/student/plans";
                }
                location.href = "/student/home";
              }
            }, 3000);

          } else {
            this.msg = res.message;
          }

        }, (error) => {
          this.msg = "We hit a road block while processing your request!";
        }
      );

    });

  }

}

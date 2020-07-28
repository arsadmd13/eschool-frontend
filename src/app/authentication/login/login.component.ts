import { Component, OnInit, ElementRef, ViewChild } from "@angular/core"
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit{

  @ViewChild('loginEmail', {static: true}) loginEmail: ElementRef;
  @ViewChild('loginPassword', {static: true}) loginPass: ElementRef;
  @ViewChild('loginForm', {static: true}) loginForm: ElementRef;

  alternate: string;
  msg: string;
  role: string;

  constructor(private route: ActivatedRoute, public authenticationService: AuthenticationService){

    this.role = sessionStorage.getItem('role');

    if(this.role != undefined){
      location.href = "/"
    }

    let path = this.route.snapshot.url.join('/');

    if(path === "faculty/login"){
      this.alternate = "/faculty/register";
    } else {
      this.alternate = "/student/register";
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

            this.msg = "Login Successfull!";

            sessionStorage.setItem('userid', res.user._id);
            sessionStorage.setItem('username', res.user.name);
            sessionStorage.setItem('role', res.user.role);

            if(role == 1) {
              location.href = "/faculty/home";
            } else {
              location.href = "/student/home";
            }

          } else if(res.status === 404) {
            this.msg = res.message;
          } else {
            this.msg = res.message;
          }
          // console.log(res);

        }, (error) => {
          this.msg = "We hit a road block while processing your request!";
        }
      );

    });

  }





}

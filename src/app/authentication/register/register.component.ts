import { Component, OnInit, ElementRef, ViewChild, Inject } from "@angular/core"
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { NgForm } from "@angular/forms";
import { timer } from 'rxjs';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit{

  @ViewChild('regName', {static: true}) regName: ElementRef;
  @ViewChild('regEmail', {static: true}) regEmail: ElementRef;
  @ViewChild('regPassword', {static: true}) regPass: ElementRef;
  @ViewChild('regPassword2', {static: true}) regPass2: ElementRef;
  @ViewChild('regForm', {static: true}) regForm: ElementRef;

  alternate: string;
  msg: string;
  role: string;

  constructor(private route: ActivatedRoute, public authenticationService: AuthenticationService){

    this.role = sessionStorage.getItem('role');

    if(this.role != undefined){
      location.href = "/"
    }

    let path = this.route.snapshot.url.join('/');

    if(path === "faculty/register"){
      this.alternate = "/faculty/login";
    } else {
      this.alternate = "/student/login";
    }
  }


  ngOnInit(): void {

    this.regForm.nativeElement.addEventListener("submit", (event) => {

      event.preventDefault();

      this.msg = "Please wait while we process your request!"

      let path = this.route.snapshot.url.join('/');

      let role = 0;

      if(path === "faculty/register"){
        role = 1;
      } else {
        role = 0;
      }

      let data = {
        name: this.regName.nativeElement.value,
        email: this.regEmail.nativeElement.value,
        password: this.regPass.nativeElement.value,
        password2: this.regPass2.nativeElement.value,
        role: role
      };


      this.authenticationService.create(data).subscribe(
        (res: any) => {
          if(res.status === 200) {

            this.msg = "Registered Successfully!";

            if(role == 1) {

              // sessionStorage.setItem('userid', res.user._id);
              // sessionStorage.setItem('username', res.user.name);
              // sessionStorage.setItem('emailId', res.user.email);
              // sessionStorage.setItem('role', res.user.role);
              //await timer(5000).take(1).toPromise();
              location.href = "/faculty/login";

            } else {

              //await timer(5000).take(1).toPromise();
              location.href = "/student/login";

            }
          } else if(res.status === 404) {
            this.msg = res.message;
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

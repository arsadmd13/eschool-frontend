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
  @ViewChild('regReset', {static: true}) regReset: ElementRef;

  alternate: string;
  msg: string;
  role: string;

  constructor(private route: ActivatedRoute, public authenticationService: AuthenticationService){

    this.role = sessionStorage.getItem('role');

    if(this.role === "1"){
      location.href = "faculty/home";
    } else if(this.role === "0"){
      location.href = "student/home"
    } else if(this.role === "2"){
      location.href = "admin/home"
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
        role: role,
        rtype: "OR"
      };

      this.authenticationService.create(data).subscribe(
        (res: any) => {
          if(res.status === 200) {

            this.regReset.nativeElement.click();
            this.msg = "Registered Successfully!";

            setTimeout(() => {
              if(role == 1) {
                location.href = "/faculty/login";
              } else {
                location.href = "/student/lohin";
              }
            }, 5000);

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

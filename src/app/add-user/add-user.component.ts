import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  @ViewChild('regUsername', {static: true}) regUsername: ElementRef;
  @ViewChild('regEmail', {static: true}) regEmail: ElementRef;
  @ViewChild('regForm', {static: true}) regForm: ElementRef;
  @ViewChild('regReset', {static: true}) regReset: ElementRef;

  msg: string;
  userId: string;
  username: string;
  role: string;
  selected: string;

  constructor(private route: ActivatedRoute, public authenticationService: AuthenticationService) {
    this.role = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('userid');
    this.username = sessionStorage.getItem('username');
    this.msg = "Users added here will have the password same as their email-id";

    if(this.role !== "2"){
      location.href = "/";
    }

  }

  ngOnInit(): void {

    this.regForm.nativeElement.addEventListener("submit", (event) => {

      event.preventDefault();

      this.msg = "Please wait while we process your request..."

      if(this.selected === "faculty"){
        var role = "1";
      } else if (this.selected === "student"){
        var role = "0";
      } else {
        var role = "";
      }

      let data = {
        name: this.regUsername.nativeElement.value,
        email: this.regEmail.nativeElement.value,
        password: this.regEmail.nativeElement.value,
        password2: this.regEmail.nativeElement.value,
        role: role,
        rtype: "AR",
        secTkn: sessionStorage.getItem('jwtToken')
      };

      this.authenticationService.create(data).subscribe(
        (res: any) => {
          if(res.status === 200) {
            this.regReset.nativeElement.click();
            document.getElementById('alert').classList.replace('alert-danger', 'alert-success');
            this.msg = "User added!";
          } else {
            this.msg = res.message;
          }
        }, (error) => {
          this.msg = "We hit a road block while processing your request!";
        }
      )

    });
  }

}

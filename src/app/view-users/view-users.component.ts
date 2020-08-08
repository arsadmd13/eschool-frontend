import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  msg: string;
  fmsg: string;
  smsg: string;
  userId: string;
  username: string;
  role: string;
  caption: string;

  fusers = []
  susers = []

  constructor(public authenticationService: AuthenticationService) { 
    this.role = sessionStorage.getItem('role');
    this.userId = sessionStorage.getItem('userid');
    this.username = sessionStorage.getItem('username');

    if(this.role !== "2"){
      location.href = "/"
    }

    const data = {
      secTkn: sessionStorage.getItem('jwtToken')
    }

    this.authenticationService.readall(data).subscribe(
      (res: any) => {
        if(res.status === 200) {
          this.fusers = res.fusers;
          this.susers = res.susers;
          this.caption = "NN-'Not Needed';    NA-'Not Available';    AV-'Available'";
          if(this.fusers.length === 0 && this.susers.length === 0){
            this.msg = "No users found!";
          } else {
            if(this.fusers.length === 0)
              this.fmsg = "No users found in this section!"
            if(this.susers.length === 0)
              this.smsg = "No users found in this section!"
          }
        } else {
          this.msg = res.message;
        }
      }, (error) => {
        this.msg = "We hit a road block while processing your request!"
      }
    );

  }

  ngOnInit(): void {
  }

}

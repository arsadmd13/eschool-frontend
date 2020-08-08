import { Component } from '@angular/core'
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent{

  role: string;
  username: string;
  subStatus: string;
  subPlan: string;
  subQuota: string;

  constructor(private route: ActivatedRoute) {
    this.role = sessionStorage.getItem('role');
    this.username = sessionStorage.getItem('username');
    this.subStatus = sessionStorage.getItem('subStatus');
    this.subPlan = sessionStorage.getItem('subPlan');
    this.subQuota = sessionStorage.getItem('subQuota');

    if(this.role === undefined || this.role == null) {
      location.href = "/";
    }

    let path = this.route.snapshot.url.join('/');

    if(path == "student/home"){
      if(this.role == "1"){
        location.href = "/faculty/home";
      } else if (this.role == "2"){
        location.href = "/admin/home";
      }
    } else if(path == "faculty/home"){
      if(this.role == "0"){
        location.href = "/student/home";
      } else if (this.role == "2"){
        location.href = "/admin/home";
      }
    } else if(path == "admin/home"){
      if(this.role == "1"){
        location.href = "/faculty/home";
      } else if (this.role == "0"){
        location.href = "/student/home";
      } 
    }

  }
}

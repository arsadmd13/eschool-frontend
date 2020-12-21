import { Component } from '@angular/core'
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { Auth } from '../utils/models/auth.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent{

  role: string;
  username: string;
  subStatus: string;
  subPlan: string;
  subQuota: string;

  user: any;

  constructor(private authenticationService: AuthenticationService, private router: Router) {

    if(!localStorage.getItem('currentUser')){
      this.router.navigate(['/'])
    }
    // this.role = sessionStorage.getItem('role');
    // this.username = sessionStorage.getItem('username');
    // this.subStatus = sessionStorage.getItem('subStatus');
    // this.subPlan = sessionStorage.getItem('subPlan');
    // this.subQuota = sessionStorage.getItem('subQuota');

    // if(this.role === undefined || this.role == null) {
    //   location.href = "/";
    // }

    // let path = this.route.snapshot.url.join('/');

    // if(path == "student/home"){
    //   if(this.role == "1"){
    //     location.href = "/faculty/home";
    //   } else if (this.role == "2"){
    //     location.href = "/admin/home";
    //   }
    // } else if(path == "faculty/home"){
    //   if(this.role == "0"){
    //     location.href = "/student/home";
    //   } else if (this.role == "2"){
    //     location.href = "/admin/home";
    //   }
    // } else if(path == "admin/home"){
    //   if(this.role == "1"){
    //     location.href = "/faculty/home";
    //   } else if (this.role == "0"){
    //     location.href = "/student/home";
    //   } 
    // }

  }

  ngOnInit(){
    this.user = this.authenticationService.currentUserValue.user;
    // console.log(this.user);
  }
}

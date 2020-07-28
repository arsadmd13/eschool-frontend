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

  constructor(private route: ActivatedRoute) {
    this.role = sessionStorage.getItem('role');
    this.username = sessionStorage.getItem('username');
    console.log(sessionStorage.getItem('username'));

    if(this.role == undefined) {
      location.href = "/";
    }

    let path = this.route.snapshot.url.join('/');

    if(path == "student/home" && this.role == "1"){
      this.alternate = "/faculty/home";
    } else if(path == "faculty/home" && this.role == "0"){
      this.alternate = "/student/home";
    }



  }
}

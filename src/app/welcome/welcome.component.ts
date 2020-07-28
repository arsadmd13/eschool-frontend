import { Component } from "@angular/core"


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})

export class WelcomeComponent{

  role: string;
  username: string;

  constructor() {
    this.role = sessionStorage.getItem('role');
    this.username = sessionStorage.getItem('username');

    if(this.role == "0") {
      location.href = "/student/home";
    } else if(this.role == "1") {
      location.href = "/faculty/home";
    }

  }

}

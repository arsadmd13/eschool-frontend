import { Component } from '@angular/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent{

  role: string;
  username: string;

  constructor() {
    this.role = sessionStorage.getItem('role');
    this.username = sessionStorage.getItem('username');
    console.log(sessionStorage.getItem('username'));


    if(this.role == undefined) {
      location.href = "/";
    }

  }
}

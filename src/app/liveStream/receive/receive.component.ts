import { Component } from '@angular/core'

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.css']
})

export class ReceiveComponent{

  role: string;
  username: string;

  constructor() {
    this.role = sessionStorage.getItem('role');
    this.username = sessionStorage.getItem('username');

    if(this.role == undefined || this.role == "1") {
      location.href = "/";
    }

  }

}

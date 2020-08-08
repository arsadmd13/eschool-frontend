import { Component } from '@angular/core'

@Component({
  selector: 'app-broadcast',
  templateUrl: './broadcast.component.html',
  styleUrls: ['./broadcast.component.css']
})

export class BroadcastComponent{

  role: string;
  username: string;

  constructor() {
    this.role = sessionStorage.getItem('role');
    this.username = sessionStorage.getItem('username');

    if(this.role === "0" || this.role === undefined || this.role === null) {
      location.href = "/";
    }

  }

}

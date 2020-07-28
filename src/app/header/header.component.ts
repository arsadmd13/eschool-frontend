import { Component } from '@angular/core'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent{

  role: string;

  constructor() {

    this.role = sessionStorage.getItem('role');

  }

}

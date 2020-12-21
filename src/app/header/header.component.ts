import { Component } from '@angular/core'
import { AuthenticationService } from '../services/authentication/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent{

  role: any;
  tabs = []

  constructor(private authenticationService: AuthenticationService) {

    authenticationService.getUser.subscribe((userValue) => {
      this.role = userValue?.user.role;
    });

    // if(this.role !== undefined && this.role !== null){
      this.role = this.authenticationService.currentUserValue?.user.role;
    // }

  }

  setTabs(tabs){
    this.tabs = tabs;
  }

  logout(){
    this.authenticationService.logout();
  }

}

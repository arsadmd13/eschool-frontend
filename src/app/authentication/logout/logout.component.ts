import { Component } from "@angular/core"

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent{

  role: string;

  constructor() {

    this.role = sessionStorage.getItem('role');

    if(this.role !== undefined || this.role !== null){
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('userid');
      sessionStorage.removeItem('subStatus');
      sessionStorage.removeItem('subPlan');
      sessionStorage.removeItem('subQuota');
      sessionStorage.removeItem('jwtToken');
    }

    location.href = "/";

  }


}

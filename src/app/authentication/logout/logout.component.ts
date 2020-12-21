import { Component } from "@angular/core"
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { AuthService } from 'src/app/utils/services/auth/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent{

  role: string;

  constructor(private authenticationService: AuthenticationService) {

    // this.role = sessionStorage.getItem('role');

    // if(this.role !== undefined || this.role !== null){
    //   sessionStorage.removeItem('role');
    //   sessionStorage.removeItem('username');
    //   sessionStorage.removeItem('userid');
    //   sessionStorage.removeItem('subStatus');
    //   sessionStorage.removeItem('subPlan');
    //   sessionStorage.removeItem('subQuota');
    //   sessionStorage.removeItem('jwtToken');
    // }
    this.authenticationService.logout()

    // location.href = "/";

  }


}

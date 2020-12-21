import { Component, ElementRef, HostListener, OnInit, ViewChild } from "@angular/core"
import { VideoService } from '../../services/video/video.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})

export class VideoComponent{

  role: string;
  username: string;
  msg: string;
  quota:string;
  subStatus: string;
  
  videosArray = [];

  wmsg: string;
  smsg: string;
  dmsg: any;

  backendUrl = environment.url;

  user: any;


  constructor(private router: Router, public videoService:VideoService, private authenticationService: AuthenticationService) {

    this.user = this.authenticationService.currentUserValue?.user;
    // console.log(this.user);
    

    if(this.user === null || this.user === undefined){
      this.router.navigate(['/'])
    }
    

    // this.showWarnAlert("Plase wait while we fetch data from our server...");

    this.videoService.readAll({}).subscribe(
      (res: any) => {
        if(res.status === 200) {
          if(this.user.subscription.status === "AV"){
            this.videosArray = res.videos
            // var len = this.videosArray.length
            // if(len > parseInt(this.quota))
            //   this.videosArray = this.videosArray.slice(0,parseInt(this.quota));
          } else if(this.user.subscription.status === "NN"){
            this.videosArray = res.videos
          } else {
            this.showWarnAlert("Please purchase a <a routerLink='/pricing'>subscription plan</a> to watch videos!");
          }
        } else if(res.status === 404){
          this.showErrorAlert(res.message);
        } else {
          this.showErrorAlert(res.message);
        }
      }, (error) => {
        this.showErrorAlert("We hit a road block while processing your request!");
      }
    );

  }

  ngOnInit(): void {
  }

  

  @ViewChild('successAlert', { static: true }) successAlert: ElementRef;
  @ViewChild('warnAlert', { static: true }) warnAlert: ElementRef;
  @ViewChild('errorAlert', { static: true }) errorAlert: ElementRef;

  successMsg = "";
  warnMsg = "";
  errorMsg = "";

  closeSuccessAlert() {
    this.successAlert.nativeElement.classList.remove('show');
  }

  showSuccessAlert(msg) {
    this.closeAllAlerts();
    this.successMsg = msg;
    this.successAlert.nativeElement.classList.add('show');
  }

  closeWarnAlert() {
    this.warnAlert.nativeElement.classList.remove('show');
  }

  showWarnAlert(msg) {
    this.closeAllAlerts();
    this.warnMsg = msg;
    this.warnAlert.nativeElement.classList.add('show');
  }

  closeErrorAlert() {
    this.errorAlert.nativeElement.classList.remove('show');
  }

  showErrorAlert(msg) {
    this.closeAllAlerts();
    this.errorMsg = msg;
    this.errorAlert.nativeElement.classList.add('show');
  }

  closeAllAlerts(){
    this.errorAlert.nativeElement.classList.remove('show');
    this.warnAlert.nativeElement.classList.remove('show');
    this.successAlert.nativeElement.classList.remove('show');
  }



}

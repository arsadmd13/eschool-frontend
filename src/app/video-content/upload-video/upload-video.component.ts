import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { environment } from 'src/environments/environment';


// const URL = 'https://nameless-plateau-81910.herokuapp.com/video/upload';//http://localhost:3000/video/upload';//

@Component({
  selector: 'app-upload',
  templateUrl: './upload-video.component.html',
  styleUrls: ['./upload-video.component.scss']
})



export class UploadComponent implements OnInit {



  @ViewChild('successAlert', { static: true }) successAlert: ElementRef;
  @ViewChild('warnAlert', { static: true }) warnAlert: ElementRef;
  @ViewChild('errorAlert', { static: true }) errorAlert: ElementRef;

  backendUrl = environment.url + 'video/upload';

  public uploader: FileUploader = new FileUploader({
    url: this.backendUrl,
    itemAlias: 'image'
  });

  role: string;
  username: string;
  userid: string;
  msg: string;
  progress: string;
  style: string;

  user: any;

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {

    this.user = this.authenticationService.currentUserValue?.user;
    // this.username = sessionStorage.getItem('username');
    // this.userid = sessionStorage.getItem('userid');

    if(this.user === null || this.user === undefined){
      this.router.navigate(['/'])
    }

    setTimeout(() => {
      this.showWarnAlert("Supported format: mp4");
    }, 2000)

  }

  ngOnInit() {
    this.uploader.onBeforeUploadItem = (fileItem: any) => {
      this.showWarnAlert("Please wait while we upload your file!");
    };
    this.uploader.onProgressItem = (progress: any) => {
      this.progress = progress['progress'];
      document.getElementById('progress-bar').style.width = progress['progress'] + '%';
    };
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
      this.showWarnAlert("Click upload and wait few seconds until the file gets uploaded!")
    };
    this.uploader.onCompleteItem = (item: any, status: any) => {
      this.showSuccessAlert("File uploaded!")
    };
  }

  setUpUploader(){
    // this.uploader.onBeforeUploadItem = (fileItem: any) => {
    //   this.showWarnAlert("Please wait while we upload your file!");
    // };
    // this.uploader.onProgressItem = (progress: any) => {
    //   this.progress = progress['progress'];
    //   document.getElementById('progress-bar').style.width = progress['progress'] + '%';
    // };
    // this.uploader.onAfterAddingFile = (file) => {
    //   file.withCredentials = false;
    //   this.showWarnAlert("Click upload and wait few seconds until the file gets uploaded!")
    // };
    // this.uploader.onCompleteItem = (item: any, status: any) => {
    //   this.showSuccessAlert("File uploaded!")
    // };
  }

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

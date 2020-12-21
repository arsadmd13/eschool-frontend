import { Component, ElementRef, HostListener, ViewChild } from '@angular/core'
import { FormControl, Validators } from '@angular/forms';
import { ClassService } from 'src/app/services/class/class.service';
import { environment } from 'src/environments/environment';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-receive',
  templateUrl: './receive.component.html',
  styleUrls: ['./receive.component.scss']
})

export class ReceiveComponent{

  role: string;
  username: string;

  showiFrame = false;

  classCode = new FormControl('', Validators.required);

  backendUrl = environment.url;

  url = this.backendUrl + "streamv2/";
  urlSafe: SafeResourceUrl;

  user: any;

  constructor(private classService: ClassService,
              public sanitizer: DomSanitizer,
              private authenticationService: AuthenticationService,
              private router: Router) {

              this.user = this.authenticationService.currentUserValue?.user

              if(this.user.role !== "1" && this.user.role !== "0"){
                this.router.navigate(['/home'])
              }
  }

  @HostListener('window:message', ['$event'])
  onMessage(e) {
    // debugger;
    if (e.origin === "http://localhost:3000" || e.origin === "https://eschool-in.herokuapp.com") { // set your origin
      if(e.data.end){
        this.showiFrame = false;
        this.showWarnAlert('Call Ended!')
      }
    }
  }
  
  submit(){
    if(this.classCode.hasError('required')){
      this.showWarnAlert('Please enter a valid class code!')
      return;
    }

    this.showWarnAlert("Please wait while we process your request...")
    
    this.classService.read({classCode: this.classCode.value}).subscribe(
      (res: any) => {
        if(res.status === 200){
          this.url += this.classCode.value;
          this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
          this.closeAllAlerts();
          this.classCode.reset();
          this.showiFrame = true;
        } else {
          this.showErrorAlert('The class code you entered is invalid!');
        }
      }, (error) => {
        this.showErrorAlert('Oops! Unable to process your request at the moment.');
      }
    )
    // this.showiFrame = true;
    // console.log(this.classCode.value);
    
  }

  ngOnInit(){
    window.document.addEventListener('myCustomEvent', this.handleEvent, false)

  }

  handleEvent(e) {
    // console.log(e.detail) // outputs: {foo: 'bar'}
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

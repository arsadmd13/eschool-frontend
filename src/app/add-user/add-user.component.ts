import { Component, OnInit, ElementRef, ViewChild  } from '@angular/core';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  @ViewChild('regUsername', {static: true}) regUsername: ElementRef;
  @ViewChild('regEmail', {static: true}) regEmail: ElementRef;
  @ViewChild('regForm', {static: true}) regForm: ElementRef;
  @ViewChild('regReset', {static: true}) regReset: ElementRef;

  msg: string;
  userId: string;
  username: string;
  user: any;
  selected: string;

  form: FormGroup;

  constructor(private router: Router, 
              public authenticationService: AuthenticationService,
              private fb: FormBuilder) {
    this.user = this.authenticationService.currentUserValue?.user;
          // this.showWarnAlert("Users added here will have the password same as their email-id");


    if(this.user.role !== "2"){
      this.router.navigate(['/']);
    }

  }

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      role: ['', Validators.required]
    })
    
    setTimeout(() => {
    }, 2000)
  }

  submit(){

    for(let control in this.form.controls){
      if(this.form.controls[control].hasError('required')){
        this.showWarnAlert('Please fill in all the mandatory fields');
        return;
      }
    }
    
    const data = this.form.value;
    data['rtype'] = "AR";

    this.showWarnAlert("Please wait while we process your request...")

    this.authenticationService.create(data).subscribe(
      (res: any) => {
        if(res.status === 200) {
          this.regReset.nativeElement.click();
          this.showSuccessAlert("User added!");
        } else {
          this.showErrorAlert(res.message);
        }
      }, (error) => {
        this.showErrorAlert("Oops! Unable to process your request at the moment.");
      }
    )

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

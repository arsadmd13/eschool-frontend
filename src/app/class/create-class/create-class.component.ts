import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ClassService } from '../../services/class/class.service';

@Component({
  selector: 'app-create-class',
  templateUrl: './create-class.component.html',
  styleUrls: ['./create-class.component.scss']
})

export class CreateClassComponent implements OnInit{

  form: FormGroup;
  username: string;

  classCode = null;
  showClassCode = false;

  user: any;

  constructor(private fb: FormBuilder,
              private classService: ClassService,
              private authenticationService: AuthenticationService,
              private router: Router) {
                this.user = this.authenticationService.currentUserValue?.user

                // if(this.authenticationService.currentUserValue.user.role !== 1){
                //   // setTimeout(() => {
                //     this.router.navigate(['/home'])
                //   // }, 2000);
                // }
                if(this.user.role !== "1" && this.user.role !== "0"){
                  this.router.navigate(['/home'])
                }
  }

  ngOnInit(){
    this.form = this.fb.group({
      className: ['', Validators.required],
      classAccess: ['', Validators.required],
      classDate: ['', Validators.required],
      // classTime: ['', Validators.required]
    })
  }

  submit(formDir: FormGroupDirective){
    for(let control in this.form.controls){
      if(this.form.controls[control].hasError('required')){
        this.showWarnAlert('Please fill in all the mandatory fields!');
        return;
      }
    }
    this.showWarnAlert('Please wait while we process your request...');
    const data = this.form.value;
    data['defaultHost'] = this.authenticationService.currentUserValue?.user.email;
    this.classService.create(data).subscribe(
      (res: any) => {
        if(res.status === 200){
          this.classCode = res.classCode;
          this.form.reset();
          this.closeAllAlerts();
          this.showClassCode = true;
        } else {
          this.showErrorAlert('Oops! Unable to process your request at the moment.');
        }
      }, (error) => {
        this.showErrorAlert('Oops! Unable to process your request at the moment.');
      }
    )
  }

  newclass(){
    this.showClassCode = false;
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

import { Component, OnInit, ElementRef, ViewChild, Inject } from "@angular/core"
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { FormBuilder, FormGroup, NgForm, Validators } from "@angular/forms";
import { timer } from 'rxjs';

import { AuthenticationService } from '../../services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit{

  @ViewChild('regName', {static: true}) regName: ElementRef;
  @ViewChild('regEmail', {static: true}) regEmail: ElementRef;
  @ViewChild('regPassword', {static: true}) regPass: ElementRef;
  @ViewChild('regPassword2', {static: true}) regPass2: ElementRef;
  @ViewChild('regForm', {static: true}) regForm: ElementRef;
  @ViewChild('regReset', {static: true}) regReset: ElementRef;

  form: FormGroup;
  alternate: string;
  msg: string;
  role: string;

  constructor(private router: Router,
              public authenticationService: AuthenticationService,
              private fb: FormBuilder){

    if(this.authenticationService.currentUserValue !== null && this.authenticationService.currentUserValue !== undefined){
      this.router.navigate(['/home'])
    }

    // this.role = sessionStorage.getItem('role');

    // if(this.role === "1"){
    //   location.href = "faculty/home";
    // } else if(this.role === "0"){
    //   location.href = "student/home"
    // } else if(this.role === "2"){
    //   location.href = "admin/home"
    // }

    // let path = this.route.snapshot.url.join('/');

    // if(path === "faculty/register"){
    //   this.alternate = "/faculty/login";
    // } else {
    //   this.alternate = "/student/login";
    // }
  }


  ngOnInit(): void {

    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      cpassword: ['', Validators.required],
      role: ['', Validators.required],
      institution: ['']
    })

    // this.regForm.nativeElement.addEventListener("submit", (event) => {

    //   event.preventDefault();

    //   document.getElementById('alert').classList.replace('alert-danger', 'alert-warning');
    //   this.msg = "Please wait while we process your request!"

    //   let path = this.route.snapshot.url.join('/');

    //   let role = 0;

    //   if(path === "faculty/register"){
    //     role = 1;
    //   } else {
    //     role = 0;
    //   }

    //   let data = {
    //     name: this.regName.nativeElement.value,
    //     email: this.regEmail.nativeElement.value,
    //     password: this.regPass.nativeElement.value,
    //     password2: this.regPass2.nativeElement.value,
    //     role: role,
    //     rtype: "OR"
    //   };

    //   //console.log(data);
      
    //   this.authenticationService.create(data).subscribe(
    //     (res: any) => {
    //       if(res.status === 200) {

    //         this.regReset.nativeElement.click();
    //         document.getElementById('alert').classList.replace('alert-warning', 'alert-success');
    //         this.msg = "Registered Successfully!";

    //         setTimeout(() => {
    //           if(role == 1) {
    //             location.href = "/faculty/login";
    //           } else {
    //             location.href = "/student/login";
    //           }
    //         }, 5000);

    //       } else {
    //         document.getElementById('alert').classList.replace('alert-warning', 'alert-danger');
    //         this.msg = res.message;
    //       }
    //     }, (error) => {
    //       document.getElementById('alert').classList.replace('alert-warning', 'alert-danger');
    //       this.msg = "We hit a road block while processing your request!";
    //      }
    //   );

    // });

  }

  submit(){
    for(let control in this.form.controls){
      if(this.form.controls[control].hasError('required')){
        this.showWarnAlert('Please fill in all the mandatory fields!');
        return;
      }
    }

    if(this.form.value.password !== this.form.value.cpassword){
      this.showWarnAlert('Passwords doesn\'t match!');
      return;
    }

    const data = this.form.value;
    data['rType'] = "OR";

    // console.log(data);
    

    this.authenticationService.register(data).subscribe(
      (res: any) => {
        if(res.status === 200){
          this.showSuccessAlert('Registration Successfull!');
          setTimeout(() => {
            this.router.navigate(['/'])
          }, 2000);
        } else if(res.status === 201){
          this.showErrorAlert(res.message)
        } else {
          this.showErrorAlert('Oops!, we are unable to process your request at the moment.')
        }
      }, (error) => {
        this.showErrorAlert('Oops!, we are unable to process your request at the moment.')
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

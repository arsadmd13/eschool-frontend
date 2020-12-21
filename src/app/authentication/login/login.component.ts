import { Component, OnInit, ElementRef, ViewChild } from "@angular/core"
import { AuthService } from '../../utils/services/auth/auth.service';
import { ActivatedRoute, Params, Router, UrlSegment } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit{

  public hoverImg: string = '<img src="https://mdbootstrap.com/img/logo/mdb192x192.jpg"/>';


  @ViewChild('loginEmail', {static: true}) loginEmail: ElementRef;
  @ViewChild('loginPassword', {static: true}) loginPass: ElementRef;
  @ViewChild('loginForm', {static: true}) loginForm: ElementRef;
  @ViewChild('loginReset', {static: true}) loginReset: ElementRef;

  alternate: string;
  msg: string;
  role: string;
  noregister: boolean;

  form: FormGroup;

  username = new FormControl('', Validators.required)
  password = new FormControl('', Validators.required)

  constructor(private route: ActivatedRoute,
              public authService: AuthService, 
              private router: Router, 
              private authenticationService: AuthenticationService,
              private fb: FormBuilder){

    var user = this.authenticationService.currentUserValue?.user;
    if(user !== null && user !== undefined){
      this.router.navigate(['/home'])
    }
    this.noregister = false;
    
    

    // if(this.role === "1"){
    //   location.href = "faculty/home";
    // } else if(this.role === "0"){
    //   location.href = "student/home"
    // } else if(this.role === "2"){
    //   location.href = "admin/home"
    // }

    // let path = this.route.snapshot.url.join('/');

    // if(path === "faculty/login"){
    //   this.alternate = "/faculty/register";
    // } else if(path === "student/login"){
    //   this.alternate = "/student/register";
    // } else {
    //   this.noregister = true;
    // }
  }

  ngOnInit(): void {

    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })


    // this.loginForm.nativeElement.addEventListener("submit", (event) => {

    //   event.preventDefault();

    //   document.getElementById('alert').classList.replace('alert-danger', 'alert-warning');
    //   this.msg = "Please wait while we process your request...";

    //   // let path = this.route.snapshot.url.join('/');

    //   // let role = 0;

    //   // if(path === "faculty/login"){
    //   //   role = 1;
    //   // } else if(path === "admin/login") {
    //   //   role = 2;
    //   // } else {
    //   //   role = 0;
    //   // }

    //   let data = {
    //     email: this.loginEmail.nativeElement.value,
    //     password: this.loginPass.nativeElement.value,
    //     // role: role
    //   };

    //   //console.log(data);

    //   this.authenticationService.login(data).subscribe(
    //     (res: any) => {

    //       if(res.status === 200) {

    //         this.loginReset.nativeElement.click();
    //         document.getElementById('alert').classList.replace('alert-warning', 'alert-success');
    //         this.msg = "Login Successfull!";

    //         // sessionStorage.setItem('userid', res.user._id);
    //         // sessionStorage.setItem('username', res.user.name);
    //         // sessionStorage.setItem('role', res.user.role);
    //         // sessionStorage.setItem('email', res.user.email);
    //         // sessionStorage.setItem('subStatus', res.user.subscription.status)
    //         // sessionStorage.setItem('subPlan', res.user.subscription.plan);
    //         // sessionStorage.setItem('jwtToken', res.token);

    //         if(res.user.subscription.status !== "NA" || res.user.subscription.status !== "NN"){
    //           var quota = res.user.subscription.plan.split(" ")[4];
    //           sessionStorage.setItem('subQuota', quota);
    //         }

    //         // setTimeout(() => {
    //         //   if(role === 1) {
    //         //     // this.headerComponent.setTabs([{name: "Home",link: "/faculty/home"}])
    //         //     // this.router.navigate(['/faculty/home']);
    //         //     location.href = "/faculty/home";
    //         //   } else if(role === 2) {
    //         //     // this.router.navigate(['/admin/home']);
    //         //     location.href = "/admin/home";
    //         //   } else {                
    //         //     if(res.user.subscription.status === "NA"){
    //         //       // this.router.navigate(['/student/plans']);
    //         //       location.href = "/student/plans";
    //         //       return
    //         //     }
    //         //     // this.router.navigate(['/student/home']);
    //         //     location.href = "/student/home";
    //         //   }
    //         // }, 3000);

    //       } else {
    //         document.getElementById('alert').classList.replace('alert-warning', 'alert-danger');
    //         this.msg = res.message;
    //       }

    //     }, (error) => {
    //       console.log(error);
          
    //       document.getElementById('alert').classList.replace('alert-warning', 'alert-danger');
    //       this.msg = "We hit a road block while processing your request!";
    //     }
    //   );

    // });

  }

  submit(){
    for(let control in this.form.controls){
      if(this.form.controls[control].hasError('required')){
        this.showWarnAlert("Please fill in the username and password to login!")
        return;
      }
    }

    const data = {
      username: this.form.value.username,
      password: this.form.value.password
    }

    this.showWarnAlert("Please wait while we verify your credentials...");

    this.authenticationService.login(data).subscribe(
      (res: any) => {
        if(res.status === 200){
          this.showSuccessAlert("Login Successfull!");
          // setTimeout(() => {
            this.router.navigate(['/home'])
          // }, 2000);
          // if(res.user.role === "1"){
          //   this.router.navigate(['/home'])
          //   // this.router.navigateByUrl("['/']");
          // } else if(res.user.role === "2"){
          //   this.router.navigate(['/home'])
          // } else {
          //   this.router.navigate(['/student/home'])
          // }
          // let closeBtn = document.getElementById('close-btn');
          // let event = new MouseEvent('click', {
          //         bubbles: true,
          //         cancelable: true,
          //         view: window
          //     });
          //     closeBtn.dispatchEvent(event);
        } else if(res.status === 404){
          this.showErrorAlert("Invalid Credentials!");
        } else {
          this.showErrorAlert("Unable to process your request at the moment!");
        }
      }, (error) => {
        this.showErrorAlert("Unable to process your request at the moment!");
      }
    )

    // console.log(data);
    
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

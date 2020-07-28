import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { BroadcastComponent } from "./liveStream/broadcast/broadcast.component"
import { ReceiveComponent } from "./liveStream/receive/receive.component"
import { UploadComponent } from './videoContent/uploadVideo/upload-video.component';
import { VideoComponent } from './videoContent/video/video.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from "./authentication/logout/logout.component";



const routes: Routes = [
  {
    path: "",
    component: WelcomeComponent
  },
  {
    path: "faculty/login",
    component: LoginComponent
  },
  {
    path: "faculty/register",
    component: RegisterComponent
  },
  {
    path: "student/login",
    component: LoginComponent
  },
  {
    path: "student/register",
    component: RegisterComponent
  },
  {
    path: "faculty/broadcast",
    component: BroadcastComponent
  },
  {
    path: "faculty/home",
    component: HomeComponent
  },
  {
    path: "student/home",
    component: HomeComponent
  },
  {
    path: "faculty/upload",
    component: UploadComponent
  },
  {
    path: "student/live",
    component: ReceiveComponent
  },
  {
    path: "student/videos",
    component: VideoComponent
  },
  {
    path: "faculty/videos",
    component: VideoComponent
  },
  {
    path: "logout",
    component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

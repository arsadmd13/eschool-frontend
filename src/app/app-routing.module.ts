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
import { CartComponent } from "./cart/cart.component";
import { PlansComponent } from "./plans/plans.component";
import { TransactionsComponent } from './transactions/transactions.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderListComponent } from './order-list/order-list.component';

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
    path: "admin/login",
    component: LoginComponent
  },
  {
    path: "student/cart",
    component: CartComponent
  },
  {
    path: "student/transactions",
    component: TransactionsComponent
  },
  {
    path: "student/plans",
    component: PlansComponent
  },
  {
    path: "faculty/broadcast",
    component: BroadcastComponent
  },
  {
    path: "admin/home",
    component: HomeComponent
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
    path: "admin/videos",
    component: VideoComponent
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
    path: "admin/add/user",
    component: AddUserComponent
  },
  {
    path: "admin/view/users",
    component: ViewUsersComponent
  },
  {
    path: "admin/view/orders",
    component: OrderListComponent
  },
  {
    path: "faculty/change-password",
    component: ChangePasswordComponent
  },
  {
    path: "student/change-password",
    component: ChangePasswordComponent
  },
  {
    path: "admin/change-password",
    component: ChangePasswordComponent
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

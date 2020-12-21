import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { WelcomeComponent } from "./welcome/welcome.component";
import { BroadcastComponent } from "./class/broadcast/broadcast.component"
import { ReceiveComponent } from "./class/receive/receive.component"
import { UploadComponent } from './video-content/upload-video/upload-video.component';
import { VideoComponent } from './video-content/video/video.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from "./authentication/logout/logout.component";
import { CartComponent } from "./cart/cart.component";
import { PlansComponent } from "./plans/plans.component";
import { TransactionsComponent } from './transactions/transactions.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderListComponent } from './order-list/order-list.component';
import { StripePaymentComponent } from './stripe-payment/stript-payment.component';
import { WysiwygEditorComponent } from './wysiwyg-editor/wysiwyg-editor.component';
import { CreateClassComponent } from './class/create-class/create-class.component';
import { PricingComponent} from './pricing/pricing.component';
import { AuthGuard } from './utils/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "create-class",
    canActivate: [AuthGuard],
    component: CreateClassComponent
  },
  {
    path: "pricing",
    component: PricingComponent
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
    path: "cart",
    canActivate: [AuthGuard],
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
    path: "admin/broadcast",
    component: BroadcastComponent
  },
  // {
  //   path: "admin/live",
  //   component: ReceiveComponent
  // },
  {
    path: "admin/home",
    component: HomeComponent
  },
  {
    path: "home",
    canActivate: [AuthGuard],
    component: HomeComponent
  },
  // {
  //   path: "student/home",
  //   component: HomeComponent
  // },
  {
    path: "upload",
    canActivate: [AuthGuard],
    component: UploadComponent
  },
  {
    path: "join-class",
    canActivate: [AuthGuard],
    component: ReceiveComponent
  },
  {
    path: "admin/videos",
    component: VideoComponent
  },
  {
    path: "videos",
    // canActivate: [AuthGuard],
    component: VideoComponent
  },
  {
    path: "faculty/videos",
    component: VideoComponent
  },
  {
    path: "add-user",
    canActivate: [AuthGuard],
    component: AddUserComponent
  },
  {
    path: "view-users",
    canActivate: [AuthGuard],
    component: ViewUsersComponent
  },
  {
    path: "view-orders",
    canActivate: [AuthGuard],
    component: OrderListComponent
  },
  {
    path: "faculty/change-password",
    component: ChangePasswordComponent
  },
  {
    path: "change-password",
    canActivate: [AuthGuard],
    component: ChangePasswordComponent
  },
  {
    path: "admin/change-password",
    component: ChangePasswordComponent
  },
  {
    path: "logout",
    canActivate: [AuthGuard],
    component: LogoutComponent
  },
  {
    path: "stripe/payment/:receiptId",
    canActivate: [AuthGuard],
    component: StripePaymentComponent
  },
  {
    path: "editor",
    component: WysiwygEditorComponent
  },
  {
    path: ":other",
    redirectTo: "/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

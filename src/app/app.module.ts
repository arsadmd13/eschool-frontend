import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import "@angular/compiler";
import { FileSelectDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';

import { NavbarModule, WavesModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { BroadcastComponent } from './liveStream/broadcast/broadcast.component';
import { ReceiveComponent } from './liveStream/receive/receive.component';
import { VideoComponent } from './videoContent/video/video.component';
import { UploadComponent } from './videoContent/uploadVideo/upload-video.component';
import { CommentsComponent } from './comments/comments.component';
import { AddCommentComponent } from './comments/addComment/add-comment.component';
import { CommentComponent } from './comments/comment/comment.component';
import { AuthenticationService } from './services/authentication/authentication.service';
import { WelcomeComponent } from './welcome/welcome.component';
import { HomeComponent } from './home/home.component';
import { LogoutComponent } from "./authentication/logout/logout.component";
import { CartComponent } from './cart/cart.component';
import { PlansComponent } from './plans/plans.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUsersComponent } from './view-users/view-users.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { OrderListComponent } from './order-list/order-list.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    BroadcastComponent,
    ReceiveComponent,
    VideoComponent,
    UploadComponent,
    CommentsComponent,
    CommentComponent,
    AddCommentComponent,
    WelcomeComponent,
    HomeComponent,
    LogoutComponent,
    CartComponent,
    PlansComponent,
    TransactionsComponent,
    AddUserComponent,
    ViewUsersComponent,
    ChangePasswordComponent,
    OrderListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NavbarModule,
    WavesModule,
    ButtonsModule,
    IconsModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    FileUploadModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
    ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

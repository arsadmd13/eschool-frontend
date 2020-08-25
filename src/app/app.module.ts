import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import "@angular/compiler";

import { NavbarModule, WavesModule, ButtonsModule, IconsModule } from 'angular-bootstrap-md'
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxStripeModule } from 'ngx-stripe';
import { FileSelectDirective } from 'ng2-file-upload';
import { FileUploadModule } from 'ng2-file-upload';
import { StripeModule } from "stripe-angular"

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
import { StripePaymentComponent } from './stripe-payment/stript-payment.component';
import { WysiwygEditorComponent } from './wysiwyg-editor/wysiwyg-editor.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// Import all Froala Editor plugins.
import 'froala-editor/js/plugins.pkgd.min.js';

// Import a single Froala Editor plugin.
import 'froala-editor/js/plugins/align.min.js';

// Import a Froala Editor language file.
import 'froala-editor/js/languages/de.js';

// Import a third-party plugin.
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

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
    OrderListComponent,
    StripePaymentComponent,
    WysiwygEditorComponent
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
    BrowserAnimationsModule,
    NgxStripeModule.forRoot('pk_test_51HIqmtJr4whGte04mO3CIdZjuPvhnoHt0RTfXRsbEk5K9mcDlMiOFq934rDvaEh3ZAfgBK96LN817L4JvfH3ut3800rh8R3VAK'),
    ReactiveFormsModule,
    StripeModule.forRoot("pk_test_51HIqmtJr4whGte04mO3CIdZjuPvhnoHt0RTfXRsbEk5K9mcDlMiOFq934rDvaEh3ZAfgBK96LN817L4JvfH3ut3800rh8R3VAK"),
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
    CKEditorModule
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

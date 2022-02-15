import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './registration-login-module/login/login.component';
import { RegisterComponent } from './registration-login-module/register/register.component';
import { ForgotPasswordComponent } from './registration-login-module/forgot-password/forgot-password.component';
import { ViewUsersComponent } from './user-actions-module/view-users/view-users.component';
import { UserNavigBarComponent } from './user-actions-module/user-navig-bar/user-navig-bar.component';
import { ShowTweetsComponent } from './user-actions-module/show-tweets/show-tweets.component';
import { UserScrollTopComponent } from './user-actions-module/user-scroll-top/user-scroll-top.component';
import { ViewUsersTweetsComponent } from './user-actions-module/view-users-tweets/view-users-tweets.component';
import { PostTweetsComponent } from './user-actions-module/post-tweets/post-tweets.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ViewUsersComponent,
    UserNavigBarComponent,
    ShowTweetsComponent,
    UserScrollTopComponent,
    ViewUsersTweetsComponent,
    PostTweetsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

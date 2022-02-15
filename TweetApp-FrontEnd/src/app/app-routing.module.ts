import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ForgotPasswordComponent } from './registration-login-module/forgot-password/forgot-password.component';
import { LoginComponent } from './registration-login-module/login/login.component';
import { RegisterComponent } from './registration-login-module/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { PostTweetsComponent } from './user-actions-module/post-tweets/post-tweets.component';
import { ShowTweetsComponent } from './user-actions-module/show-tweets/show-tweets.component';
import { ViewUsersTweetsComponent } from './user-actions-module/view-users-tweets/view-users-tweets.component';
import { ViewUsersComponent } from './user-actions-module/view-users/view-users.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent },
  {path : "" , redirectTo : "login", pathMatch : "full"},
  {path: 'register', component: RegisterComponent},
  {path : "forgot", component : ForgotPasswordComponent},
  {path : "users", component : ViewUsersComponent, canActivate : [AuthGuardService]},
  {path : "home", component : ShowTweetsComponent, canActivate : [AuthGuardService]}, 
  {path : "user-tweets/:username", component : ViewUsersTweetsComponent, canActivate : [AuthGuardService]},
  {path : "post-tweets", component : PostTweetsComponent, canActivate : [AuthGuardService]},
  {path : "**", component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

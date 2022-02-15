import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginRequest } from 'src/app/model/login-request';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  invalidLogin = false;
  loginRequest: LoginRequest = new LoginRequest("","");  
  myFormGroup : FormGroup;
  emailValid : boolean = false;
  nullValueErrorMessage : boolean = false;
  data : Array<User>;

  constructor(private router: Router,public authenticationService: AuthenticationService,formBuilder : FormBuilder) { 
      this.myFormGroup=formBuilder.group({
        "email" : new FormControl("",[Validators.required, Validators.email]),
        "password" : new FormControl("", [Validators.required])
      });
    }

  ngOnInit() {
  }

  emailValidation(email : HTMLInputElement){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value))
    {
      this.emailValid = false;
      console.log(this.emailValid);
    }
    else{  
      this.emailValid = true;
      console.log(this.emailValid);
    }
    if(email.value.length==0){
      this.emailValid = true;    
      //console.log("in if cond->",this.emailValid);
    }else{
      this.nullValueErrorMessage = false;
    }
  }
  
  passwordEmpty(){
    if(this.myFormGroup.controls['password'].value.length!=0){
      this.nullValueErrorMessage = false;
    }
    else{
      this.nullValueErrorMessage = true;
    }
  }

    //login of user method
    login(){
      if(this.myFormGroup.controls['email'].value.length!=0 && this.myFormGroup.controls['password'].value.length!=0){

        this.loginRequest.email= this.myFormGroup.controls['email'].value;
        this.loginRequest.password=this.myFormGroup.controls['password'].value;

        this.authenticationService.authenticate(this.loginRequest).subscribe((successData)=>{
        console.log("Login Successful");
        this.router.navigate(['/home']);
        this.invalidLogin=false;
        console.log(successData);
      },failureData => {
        console.log(" Login Failed");
        this.invalidLogin = true;
        console.log(failureData);
      });     

      // this.router.navigate(['/home']);
      // this.preventBackButton();
      this.nullValueErrorMessage = false;
    }
    else{
      this.nullValueErrorMessage = true;
    }
  }

}

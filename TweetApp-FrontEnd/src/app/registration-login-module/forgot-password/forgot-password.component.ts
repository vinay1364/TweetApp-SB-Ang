import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgotPasswordRequest } from 'src/app/model/forgot-password-request';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  myFormGroup: FormGroup = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required),
    rePassword: new FormControl("", Validators.required),
  });
  emailValid : boolean = false;
  prePasswordCheck : boolean = false;
  passwordValidation :boolean = false;
  passwordLength : boolean = false;
  showElement : boolean = false;  
  forgotpswdRequest: ForgotPasswordRequest = new ForgotPasswordRequest("","");

  constructor(private router: Router, private userService: UserService) { 
    }

  ngOnInit(): void{
  }

  forgotPassword() {
    // console.log("forgotPassword() request Email->",this.myFormGroup.controls['email'].value);
    // console.log("forgotPassword() request Pswd->",this.myFormGroup.controls['password'].value);
    // console.log("forgotPassword() request Conf Pswd->",this.myFormGroup.controls['confirmPassword'].value);

    if(this.emailValid == false && this.passwordValidation == false){
      if(this.myFormGroup.controls['email'].value.length!=0&&
      this.myFormGroup.controls['password'].value.length!=0&&
      this.myFormGroup.controls['rePassword'].value.length!=0){

        this.forgotpswdRequest.email=this.myFormGroup.controls['email'].value;
        this.forgotpswdRequest.password=this.myFormGroup.controls['password'].value;
       
        this.userService.forgotPassword(this.forgotpswdRequest).subscribe((response)=>{
          console.log("ForgotPassword()-",response);
          this.showElement = true;
          setTimeout(function() {
            console.log('hide');
            this.showElement = false;
            this.router.navigate(['/login'])
          }.bind(this), 3000);
          this.myFormGroup.controls['email'].reset()
          this.myFormGroup.controls['password'].reset()
          this.myFormGroup.controls['rePassword'].reset()   
        },
        // failure function
        failureData => {
          console.log("ForgotPassword()-",failureData);
        })
      }
      else{
        alert("All fields are Required.")
      }
   
    }
      else{
        alert("Error occured!!");
      }     
  }


  emailValidation(email : HTMLInputElement){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value))
    {
      this.emailValid = false;
      // console.log(this.emailValid)
    }
    else{
  
      this.emailValid = true;
      // console.log(this.emailValid)
    }
    if(email.value.length==0){
      this.emailValid = true;
    }
  }  

    // Check prePassword
    checkPrePassword(password : HTMLInputElement ){
      if(password.value.length>=6 && password.value.length<=12){
        this.passwordLength = false;
        }
        else{
          this.passwordLength = true;
        }
      if(password.value.length!=0){
        this.prePasswordCheck = false;
      }else{
        this.passwordLength = false;
      }
    } 

     //check if password and repassword are same
     checkPassword(password : HTMLInputElement,rePassword : HTMLInputElement){
    
      // console.log(password.value,rePassword.value);
      if(password.value.length!=0){
          this.prePasswordCheck = false;
            if(password.value == rePassword.value || rePassword.value.length==0){
                this.passwordValidation = false;
              }else{
                  this.passwordValidation = true;
              }
            }else{
                  this.prePasswordCheck = true;
      }
      if(rePassword.value.length==0){
        this.prePasswordCheck = false;
      }
      if(this.prePasswordCheck){
        rePassword.value="";
      }
    } 
  

  //Convert from AbsctractControl to FormControl
  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
}

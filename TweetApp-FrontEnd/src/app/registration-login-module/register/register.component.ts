import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User("","","","","","","","");

  myFormGroup : FormGroup;
  passwordValidation : boolean = false;
  prePasswordCheck : boolean = false;
  passwordLength : boolean = false;
  emailValid : boolean = false;
  dateValid : boolean = false;
  //contactValid : boolean = false;
  phoneValidation : boolean = false;
  phoneValidationIsNan : boolean = false;
  sussesfullyRegistered : boolean = false;
  showElement : boolean = false;
  userDate : Date;
  emailNotAvailable : boolean = false;
  genderNotAvailable : boolean = false;

  usersList : Array<User>
  email : Array<string>


  constructor(private userService: UserService,private router: Router, formbuilder : FormBuilder) {
    this.myFormGroup=formbuilder.group({
      "firstName" : new FormControl("",[Validators.required]),
      "lastName" : new FormControl("",[Validators.required]),
      "gender" : new FormControl("",[Validators.required]),
      "date" : new FormControl("",Validators.required),
      "email" : new FormControl("",[Validators.required]),
      "password" : new FormControl("", [Validators.required]),
      "rePassword" : new FormControl("", [Validators.required]),     
      "contact" : new FormControl("",Validators.required)
    });
   }

  ngOnInit(): void {
  }

  saveNewUser(){
    /*************************************** */
    this.userService.registerUser(this.user).subscribe( data =>{
      console.log("in saveEmployee() received data->",data);
      this.goToViewAllUsersList();
    },
    error => console.log(error));

    //this.goToViewAllUsersList();
  }

  goToViewAllUsersList(){
    this.router.navigate(['login']);
  }
  
  onSubmit(){
    console.log("User input->",this.user);
    this.saveNewUser();
  }



   
  // get gender
  getGender(gender : HTMLInputElement){
  let genderValue = this.myFormGroup.controls['gender'].value;
  if(genderValue.length!=0)
    this.genderNotAvailable = true;
  else
    this.genderNotAvailable = false;
  console.log("User input gender->",genderValue);
  }  
  
  
  //check if password and repassword are same

  checkPassword(password : HTMLInputElement,rePassword : HTMLInputElement){
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

  // Check prePassword
  checkPrePassword(password : HTMLInputElement){
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


   //Email Validation

   emailValidation(email : HTMLInputElement){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email.value))
    {
      this.emailValid = false;
    }
    else{
      this.emailValid = true;
    }
    if(email.value.length==0){
      this.emailValid = false 
    }
  }  

  // validate Phone number
  phoneNumberValidaton(number : HTMLInputElement){
    let mobilePattern = "^((\\+91-?)|0)?[0-9]{10}$";
    if(number.value.match(mobilePattern) || number.value.length==0){
      this.phoneValidation = false;
    }else{
      this.phoneValidation = true;
    }
    if(!Number.isNaN(parseInt(number.value)) || number.value.length==0 ){
      this.phoneValidationIsNan = false;
    }
    else{
      this.phoneValidationIsNan = true;
    }
  }

   //change date format to YYYY-MM-DD
   checkDate(){
     console.log("called check date")
    this.userDate = this.myFormGroup.controls['date'].value;
     console.log("user input date->,",this.userDate);

     var ToDate = new Date();
     console.log("Today date->,",ToDate);
     console.log("comparing date->",ToDate.getTime()>=new Date(this.userDate).getTime());

     if(ToDate.getTime()<=new Date(this.userDate).getTime()){
      //alert("Input Date must be less than or equal to today's date");
      this.dateValid=true;
     }
     else{
      this.dateValid=false;
     }
       

  }


  // get unique email id
  getEmails(){
    if(this.myFormGroup.controls['email'].value.length==0){
      this.emailNotAvailable = false
    }else{
      this.emailNotAvailable = true
    }
    console.log("in the get usernames")
    this.userService.getUsersList().subscribe(data =>{
      this.usersList = data
      for(let names of this.usersList){
        if(names.email == this.myFormGroup.controls['email'].value ){
          console.log("Email already exists!")
          this.emailNotAvailable = true;
          break;
        }
        else{
          this.emailNotAvailable = false;
          console.log("Email Available.")
        }
      }
    })
  }  

   //registering the user

   register(){
    console.log(this.emailValid,this.passwordLength,this.passwordValidation,this.phoneValidation);
    if(!this.emailValid &&
       !this.passwordLength &&
       !this.passwordValidation &&
       !this.phoneValidation&&
       !this.dateValid){
     
      if(this.myFormGroup.controls['firstName'].value.length!=0&&
        this.myFormGroup.controls['lastName'].value.length!=0&&
        this.myFormGroup.controls['gender'].value!=0&&
        this.myFormGroup.controls['email'].value.length!=0&&
        this.myFormGroup.controls['password'].value.length!=0&&
        this.myFormGroup.controls['rePassword'].value.length!=0&&
        this.myFormGroup.controls['contact'].value.length!=0&&
        this.myFormGroup.controls['date'].value.length!=0
        ){

          //userId is generated by DB
          let user = new User(
            "",
            this.myFormGroup.controls['firstName'].value,
            this.myFormGroup.controls['lastName'].value,
            this.myFormGroup.controls['gender'].value,
            this.myFormGroup.controls['date'].value,
            this.myFormGroup.controls['email'].value,              
            this.myFormGroup.controls['password'].value,
            this.myFormGroup.controls['contact'].value,
          );
          
          this.userService.registerUser(user).subscribe((response)=>{
            console.log("Register user response->",response);
            this.myFormGroup.controls['firstName'].reset();
            this.myFormGroup.controls['lastName'].reset();
            this.myFormGroup.controls['email'].reset();
            this.myFormGroup.controls['password'].reset();
            this.myFormGroup.controls['rePassword'].reset();
            this.myFormGroup.controls['contact'].reset();
            this.showElement = true;
            setTimeout(function() {
              console.log('hide');
              this.showElement = false;
              this.router.navigate(['/login'])
            }.bind(this), 3000);
          },
          // failure function
          failureData => {
            console.log(failureData);
            //alert("email alredy taken")
            this.emailNotAvailable = true;
            setTimeout(function() {
              console.log('hide');
              this.emailNotAvailable = false;
            }.bind(this), 3000);
          });
      }
      else{
        alert("All the Fields are Required!!");
      }
    }else{
      alert("enter valid details");
    }
    
  }







}
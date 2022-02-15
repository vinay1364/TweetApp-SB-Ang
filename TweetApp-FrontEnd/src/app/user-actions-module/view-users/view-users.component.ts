import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {

  users: User[] = [];
  showSearchedText: boolean = false;
  searchedText: string="";
  enableButtonForSearch: boolean = false;
  noUsersToDisplay: boolean = false;
  myFormGroup: FormGroup= new FormGroup({
    "search": new FormControl("", Validators.required)});
  
  constructor(public userService: UserService, public router: Router) {
    console.log("Inside View-users constructor()");
  }

  ngOnInit(){
    console.log("Inside View-users onInit()");
    if(this.enableButtonForSearch){
      this.search();
    }else{
      this.userService.getUsersList().subscribe(response =>{
        this.users = response;
        if(this.users.length==0){
          this.noUsersToDisplay = true;
        }else{
          this.noUsersToDisplay = false;
        }
         console.log(this.users);
       })
    }
    console.log("In viewusers init()->");
    console.log("In viewusers sessionstorage.getitem()->", sessionStorage.getItem('username'));
    console.log("In viewusers sessionstorage.getitem()->", sessionStorage.getItem('currentUser'));
    //this.getUsers();
    console.log("In viewusers init() closed->");
  }

  // private getUsers() {
  //   this.userService.getUsersList().subscribe(data => {
  //     this.users = data;
  //     console.log("from init() calling getUSers()->", data);
  //   });
  //   console.log("in getUSers() View all users->", this.users);
  // }

    // enable search button
    enableSearchButton(){
      let enteredUserName = this.myFormGroup.controls['search'].value;
      if(enteredUserName.length>0){
        // this.noUsersToDisplay = false;
        this.enableButtonForSearch = true;
      }else{
        this.enableButtonForSearch = false;
      }
  
    }
  
    //search for user  
    search(){
      console.log("called search")
      let enteredUserName = this.myFormGroup.controls['search'].value;
      if(enteredUserName.length>0){
        this.userService.getUsersByUserName(enteredUserName).subscribe(response=>{
          this.users = response;
          if(this.users.length==0){
            this.noUsersToDisplay = true;
          }else{
            this.noUsersToDisplay = false;
          }
          console.log(response);
        })
        this.showSearchedText = true;
        this.searchedText = enteredUserName;
        this.myFormGroup.controls['search'].reset();
        this.enableButtonForSearch = false;
      }
      else{
      this.showSearchedText = false;  
      }
      console.log(enteredUserName);
    }

    getDetails(username: string){  //here username = email
      console.log(username);
      console.log(" getDetails() username-",username);
      this.router.navigate(['/user-tweets/'+username]);
    }

    convertToFormControl(absCtrl: AbstractControl | null): FormControl {
      const ctrl = absCtrl as FormControl;
      return ctrl;
    }
      

}

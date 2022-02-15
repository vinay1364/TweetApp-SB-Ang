import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-navig-bar',
  templateUrl: './user-navig-bar.component.html',
  styleUrls: ['./user-navig-bar.component.css']
})
export class UserNavigBarComponent implements OnInit {

  name: string="";
  constructor(private authenticationService: AuthenticationService,
    private router: Router) {     
     
    }

  ngOnInit(): void {
    console.log("In Navbar onInit() called");
    //const useremail = sessionStorage.getItem('username');
    let userVar = sessionStorage.getItem('currentUser');
    // console.log("In navbar sessionstorage.getitem()->",useremail);
    // console.log("typeof value->",typeof useremail);
    console.log("In navbar sessionstorage.getitem()->",userVar);
    // console.log("typeof value->",typeof value2);
    let user:User=JSON.parse(userVar ||'{}');
    //console.log("After parsing- ->",user.first_name, user.last_name);
    let ful=user.first_name.concat(" ",user.last_name);
    this.name=ful.toUpperCase();
    console.log("After parsing- Full name->",ful.toUpperCase());
    console.log("In Navbar onInit() exit");
  }

  logout(){
    this.authenticationService.logOut();
  }

}

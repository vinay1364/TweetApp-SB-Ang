import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../model/login-request';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    //currentUser : User;
    private baseURL = "http://localhost:8081/";
    userName:string;

    constructor(private httpClient: HttpClient) {
      console.log("Authenticate sevice construtor");
     }
 
   authenticate(loginRequest : LoginRequest) {
      console.log("Authenticate()->",loginRequest);

    return this.httpClient.post(`${this.baseURL}`+"login",loginRequest).pipe(
      map((successData : Response)=>{
        console.log("User Authenticated-",successData); 
       sessionStorage.setItem('username', JSON.stringify(loginRequest.email));
       sessionStorage.setItem('currentUser', JSON.stringify(successData));  
        return "success";
      }),
      map(failureData=>{
        console.log("Authentication Error-",failureData);
        return "error";
      })
    );
   }
 
   isUserLoggedIn() {
     let user = sessionStorage.getItem('username');
     let currentUser = sessionStorage.getItem('currentUser');
     //console.log(!(user === null))
     console.log("isUserLoggedIn()-> username=",user);
     console.log("In Authen service isUserLoggedIn()2-> currentUSer=",currentUser);
     this.userName=user;
     return !(currentUser === null);
     //return !(user === null);
   }
 
   logOut() {
    console.log("In Authentication Srvc - logOut()-> username=",this.userName.substring(1,this.userName.length-1));    
     this.httpClient.get("http://localhost:8081/"+"logout/"+this.userName.substring(1,this.userName.length-1))
     .subscribe( data =>{
      console.log("In Authentication Srvc - logOut()-> response=",data);
      sessionStorage.removeItem('username');
      sessionStorage.removeItem('currentUser');   
      console.log("In Authentication Srvc - logOut()-> currentUser removed",sessionStorage.getItem('username'));
    },
    error => console.log(error));
      
   }

}

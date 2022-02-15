import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { ForgotPasswordRequest } from '../model/forgot-password-request';

@Injectable({
  providedIn: 'root'
})
export class UserService {
 
  private baseURL = "http://localhost:8081/";

  constructor(private httpClient: HttpClient) { }
  
  getUsersList(): Observable<User[]>{
    console.log("In getUsersList()");
    return this.httpClient.get<User[]>(`${this.baseURL}`+"users/all");
  }

  getUsersByUserName(userName: string): Observable<User[]>{
    console.log("userService-> userName= ",userName);
    return this.httpClient.get<User[]>(`${this.baseURL}`+"user/search/"+`${userName}`);
  }

  registerUser(user: User): Observable<Object>{
    return this.httpClient.post(`${this.baseURL}`+"register", user);
  }

  forgotPassword(forgotpswdRequest: ForgotPasswordRequest) : Observable<Object>{
    console.log("forgotPassword-> forgotpswdRequest= ",forgotpswdRequest);
    return this.httpClient.put(`${this.baseURL}`+`${forgotpswdRequest.email}`+"/forgot", forgotpswdRequest);
  }

}

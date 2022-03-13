import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Reply } from '../model/reply';
import { Tweet } from '../model/tweet';
import { TweetRequest } from '../model/tweet-request';
import { TweetResponse } from '../model/tweet-response';
import { TweetUpdate } from '../model/tweet-update';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TweetService {

  //private baseURL = "http://localhost:8081/";
  private baseURL = "http://localhost:8081/api/v1.0/tweets/";

  constructor(private httpClient: HttpClient) { }

  getAllTweetsOfUser(userName : string, loggedInUser: string) : Observable<TweetResponse[]>{
    console.log("In TweetService- username->",userName, loggedInUser);
    console.log("In TweetService- loggedinUserID->", loggedInUser);
    let headers = new HttpHeaders({'loggedInUser': loggedInUser});
    return this.httpClient.get<TweetResponse[]>(`${this.baseURL}`+userName,{headers});
  }

  postTweet(username: string, tweet : TweetRequest){
    return this.httpClient.post(`${this.baseURL}`+username+`/add`,tweet);
  }
  
  updateTweet(tweetId : string, description : string, username: string){
    let tweetUpdate = new TweetUpdate(tweetId,description);    
    return this.httpClient.put(`${this.baseURL}`+username+"/update/"+tweetId,tweetUpdate);
  }  

  editTweet(id : string, username: string){
    return this.httpClient.get<TweetResponse>(`${this.baseURL}`+username+"/"+id);
  }
  
  deleteTweet(tweetId : string, username: string){
    return this.httpClient.delete(`${this.baseURL}`+username+"/delete/"+tweetId);
  }

  likeTweet(tweetId : string, username: string){
    // let headers = new HttpHeaders({'tweetId':id});
    return this.httpClient.put(`${this.baseURL}`+username+"/like/"+tweetId,null).pipe(
      map((successData : Response)=>{
        console.log("success")
        console.log(successData)
        return "success";
      }),
      map(failureData=>{
        console.log(failureData);
        return failureData;
      })
    );
    ;
  }


  replyTweet(reply : string ,tweetId : string, username: string){
    // let headers = new HttpHeaders({'tweetReply': reply});
    console.log(tweetId , reply);
    let sendReply = new Reply(reply,"","");
    return this.httpClient.post(`${this.baseURL}`+username+"/reply/"+tweetId,sendReply).pipe(
      map((successData : Response)=>{
        console.log("success")
        console.log(successData)
        return "success";
      }),
      map(failureData=>{
        console.log(failureData);
        return failureData;
      })
    );
  }
  
}

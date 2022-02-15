import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Tweet } from 'src/app/model/tweet';
import { TweetRequest } from 'src/app/model/tweet-request';
import { User } from 'src/app/model/user';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-post-tweets',
  templateUrl: './post-tweets.component.html',
  styleUrls: ['./post-tweets.component.css']
})
export class PostTweetsComponent implements OnInit {

  userEmail: string="";
  user:User=new User("","","","","","","","");
  myFormGroup: FormGroup= new FormGroup({
    "tweet": new FormControl("", Validators.required)});
  today= new Date();
  todaysDataTime = '';
  //newTweet: TweetRequest;

  showTweetLength : boolean = false;
  showTweetRed : boolean = false;
  tweetEmpty : boolean = false;
  showElement : boolean = false;
  remainingTweetLength : number;
  tweetLengthExceeded : boolean = false;
 
  

  constructor(public router : Router,public tweetService : TweetService){
    this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
   }

  ngOnInit(): void {
   this.getUserName();
  }

  postTweet(){
    let tweet = this.myFormGroup.controls['tweet'].value;
    console.log("In Post-tweets - Entered tweet is=",tweet);
    
    if(tweet.length == 0){
      this.tweetEmpty = true;
    }
    else{      
      let newTweet: TweetRequest=new TweetRequest(tweet,this.user.id) ;     
      console.log("In Post-tweets - Entered tweet REquest is=",newTweet);
      this.tweetService.postTweet(this.userEmail,newTweet).subscribe((response)=>{
        console.log("PostTweet()->Success",response);
        if(response == "success"){
          console.log("success");
        }
      },
      failureData => {
        console.log("PostTweet()->Error",failureData);
      });  
      
      this.showElement = true;
        setTimeout(function() {
          console.log('hide');
          this.showElement = false;
        }.bind(this), 3000);
      this.myFormGroup.controls['tweet'].reset();
      this.showTweetLength = false;
      }   
  } 

  getUserName(){
    let username=sessionStorage.getItem('username');
    let user=sessionStorage.getItem('currentUser');
    let strUserName=JSON.parse(username||'{}');
    let strUser=JSON.parse(user||'{}');

    this.userEmail=strUserName;
    this.user=strUser;
    console.log("In Post-tweets - username=",this.userEmail);
  }

  tweetLengthValidationMethod(){
    
    let tweet = this.myFormGroup.controls['tweet'].value;
    if(tweet.length!=0){
      this.tweetEmpty = false;
      this.showTweetLength = true;
      this.remainingTweetLength = 145 - tweet.length ;
    }
    else{
      this.showTweetLength = false
    }

    if(tweet.length>=145 && tweet.length!=0){
      this.showTweetRed = true;
      this.tweetLengthExceeded = true;
      
    }else{
      
      this.tweetLengthExceeded = false;
      this.showTweetRed = false;
    }
  }



}

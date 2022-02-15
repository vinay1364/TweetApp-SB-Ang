import { formatDate, LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TweetResponse } from 'src/app/model/tweet-response';
import { User } from 'src/app/model/user';
import { TweetService } from 'src/app/services/tweet.service';

@Component({
  selector: 'app-show-tweets',
  templateUrl: './show-tweets.component.html',
  styleUrls: ['./show-tweets.component.css']
})
export class ShowTweetsComponent implements OnInit {

  userName: string='';
  user:User=new User("","","","","","","","");
  noTweets : boolean = false;
  today= new Date();
  todaysDataTime = '';
  clickedReplyButton : {[key: number] : boolean} ={};
  enableLikeButton : {[key: number] : boolean} ={};
  enablePostButton : boolean = false;
  showElement : boolean = false;
  tweets : TweetResponse[]=[];
  singleTweet : TweetResponse=new TweetResponse("","","","",[],[],0,0,false);
  //commentList : Array<CommentsList>;
  obj : Object={};
  tweetTex : string="";
  tweetEmpty : boolean = false;
  showTweetLength : boolean = false;
  remainingTweetLength : number=0;
  showTweetRed : boolean = false;
  tweetLengthExceeded : boolean = false;
  showModel : boolean = false;
  deleteTweetPopup : boolean = false;
  likedTweetPopup : boolean = false;
  updateTweetPopup : boolean = false;
  myFormGroup : FormGroup= new FormGroup(
    {"reply" : new FormControl("",Validators.required),
  });

  constructor(private tweetService: TweetService, formBuilder : FormBuilder,  private locationStrategy: LocationStrategy, 
    public router : Router) {
      this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
     }

  ngOnInit(): void {
    this.showTweets();
  }

  getUserName(){
    let username=sessionStorage.getItem('username');
    let user=sessionStorage.getItem('currentUser');
    let strUserName=JSON.parse(username||'{}');
    let strUser=JSON.parse(user||'{}');
    this.user=strUser;

    if(username!==null)
      return strUserName;
    return "";
  }

  showTweets(){
    this.userName=this.getUserName();
    if(this.userName.length>0){
      console.log("IN Show-Tweets showTweets()- userName found->",this.userName);
      console.log("IN Show-Tweets showTweets()-  user found->",this.user);
      this.tweetService.getAllTweetsOfUser(this.userName, this.user.id).subscribe(response =>{
        this.tweets = response;
          console.log("Tweets received",this.tweets);
          if(this.tweets.length!=0){
            this.noTweets = false;
          }else{
            this.noTweets = true;
          }          
        },failureData => {
          this.noTweets=true;        
           console.log(failureData);
         });
    }
    else{
      console.log("In showTweets() -No userName found",this.userName);
    }
     
  }

  editTweet(id : string){
    this.showModel = true;
    this.tweetService.editTweet(id, this.userName).subscribe((response : TweetResponse)=>{
      this.singleTweet = response;
      this.tweetTex = this.singleTweet.description;
      console.log(response);
    });
  }

  updateTweet(tweet : HTMLTextAreaElement , id : string){
    console.log(id);
    if(tweet.value.length==0){
      this.tweetEmpty = true;
    }
    else{
      this.tweetEmpty = false;
    }
    this.tweetService.updateTweet(id,tweet.value,this.userName).subscribe(response=>{
      console.log(response);
      if(response){
        setTimeout(() => {
          this.updateTweetPopup = true;
          console.log(this.updateTweetPopup);
          console.log('hide');
          this.updateTweetPopup = false;
        }, 3000);
        this.showModel = false;
        this.showTweets();
        this.closeUpdateTweet(tweet);
      }
    },
    // failure function
    failureData => {
      console.log(failureData);
    });
  }

  closeUpdateTweet(tweet : HTMLTextAreaElement){
    tweet.value='';
    this.showModel = false;
    this.showTweetLength = false;
  }

  deleteTweet(id : string){
    console.log("In ShowTweets - deleteTweet()- ",id);
    this.tweetService.deleteTweet(id, this.userName).subscribe(response=>{
      console.log("In ShowTweets, After DELETE Response is here->",response);
      this.deleteTweetPopup = true;
       setTimeout(function()  {
          console.log('hide');
          this.deleteTweetPopup = false;
        }.bind(this), 3000);
      this.tweetService.getAllTweetsOfUser(this.userName, this.user.id).subscribe(response =>{
        console.log("In ShowTweets, After GET Tweets Response is here->",response);
        this.tweets = response;
        //this.deleteTweetPopup = true;
        // setTimeout(function()  {
        //   console.log('hide');
        //   this.deleteTweetPopup = false;
        // }.bind(this), 3000);
        if(this.tweets.length!=0){
          this.noTweets = false;
        }else{
          this.noTweets = true;
        }
      },
      // failure function
      failureData => {
        this.tweets=[];
        console.log(failureData);
        this.noTweets = true;
        
      });
    },
    failureData => {
      console.log(failureData);
    });
  }

  tweetLengthValidationMethod(tweetOfUser : HTMLTextAreaElement){// HTMLInputElement
    
      let tweet = tweetOfUser.value;
      if(tweet.length!=0){
        this.tweetEmpty = false;
        this.showTweetLength = true;
        this.remainingTweetLength = 145 - tweet.length ;
        // console.log(this.remainingTweetLength);
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

  

  likeTweet(id : string){
    console.log(id);
    this.tweetService.likeTweet(id, this.userName).subscribe((response)=>{
      console.log("In ShowTweets, After Like Tweets Response is here->",response);
      if(response == "success"){
        this.showTweets();
        this.likedTweetPopup = true;
        setTimeout(function() {
          console.log('hide');
          this.likedTweetPopup = false;
        }.bind(this), 3000);
      }
    },
    // failure function
    failureData => {
      console.log(failureData);
    });
  }

  modelshow(){
    console.log("model show called")
    if(this.showModel = false){
      this.showModel =  true
    }else{
      this.showModel = false
    }
    
  }


  replyTweet(id : string){
    let reply = this.myFormGroup.controls['reply'].value;
    if(reply.length==0){
      alert("Reply can't be empty");
    }
    else{
        // alert("commented!");
        console.log(id)
        this.tweetService.replyTweet(reply,id, this.userName).subscribe((response=>{
          console.log(response);
          if(response=="success"){
            this.myFormGroup.controls['reply'].reset();
            this.showElement = true;
            this.showTweets();
            setTimeout(function() {
              console.log('hide');
              this.showElement = false;
            }.bind(this), 3000);
          }
          
        }),
        // failure function
        failureData => {
          console.log(failureData);
        });
        
      }
    }


  showButton(){
    let reply = this.myFormGroup.controls['reply'].value;
    // console.log(reply);
    if(reply.length==0){
      this.enablePostButton = false;
    }else{
      this.enablePostButton = true;
    }
  }

  preventBackButton() {
    // console.log("preventBackButton method")
    history.pushState(null, "", location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, "", location.href);
    })
  }

  openSite(siteUrl: string) {
    window.open("//" + siteUrl, '_blank');
  }

  isReplyClicked(index : number){
    if(this.clickedReplyButton[index]==false){
    this.clickedReplyButton[index] = true;
  }
    else
    this.clickedReplyButton[index] = false;
  }

   //Convert from AbsctractControl to FormControl
   convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }
  

}

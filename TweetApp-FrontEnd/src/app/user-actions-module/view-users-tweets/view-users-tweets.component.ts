import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { TweetResponse } from 'src/app/model/tweet-response';
import { User } from 'src/app/model/user';
import { TweetService } from 'src/app/services/tweet.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-view-users-tweets',
  templateUrl: './view-users-tweets.component.html',
  styleUrls: ['./view-users-tweets.component.css']
})
export class ViewUsersTweetsComponent implements OnInit {

  userName: string='';
  user:User=new User("","","","","","","","");

  today= new Date();
  todaysDataTime = '';
  clickedReplyButton : {[key: number] : boolean} ={};
  enablePostButton : boolean = false;
  showElement : boolean = false;
  searchedUserTweets : string="";
  searchedUserFullName : string="";
  tweets : TweetResponse[]=[];
  noTweets : boolean = false;
  likedTweetPopup : boolean = false;  
  myFormGroup: FormGroup= new FormGroup({
    "reply": new FormControl("", Validators.required)});
  

  constructor(public activeRoute : ActivatedRoute , public tweetService : TweetService, 
    public userService : UserService) {
    this.todaysDataTime = formatDate(this.today, 'dd-MM-yyyy', 'en-US', '+0530');
  }

  ngOnInit(): void {
    this.getAllTweets();
  }

  getLoggedInUserInfo(){
    console.log("In ViewUSerTweetsr getLoggedInUserInfo() called");
    let userVar = sessionStorage.getItem('currentUser');
    console.log("In ViewUSerTweetsr sessionstorage.getitem()->",userVar);
    let userParsed:User=JSON.parse(userVar ||'{}');
    console.log("After parsing- loggedin user->",userParsed);
   // this.user.id=userParsed.id;
    this.user=userParsed;
  }

  getAllTweets(){
    this.activeRoute.params.subscribe((parameter => this.searchedUserTweets = parameter["username"]));
    this.getLoggedInUserInfo();
    console.log("in ViewUserTweets- searchedUSerTweets",this.searchedUserTweets," userID->",this.user.id);
    this.getSearchedUserInfo(this.searchedUserTweets);
    this.tweetService.getAllTweetsOfUser(this.searchedUserTweets,this.user.id).subscribe(response =>{
      this.tweets = response;
        console.log(this.tweets);
        if(this.tweets.length!=0){
          this.noTweets = false;
          console.log("this.noTweets->",this.noTweets);
        }else{
          this.noTweets = true;
          console.log("this.noTweets->",this.noTweets);
        }        
      },failureData => {
       this.noTweets=true;        
        console.log(failureData);
      });  
  }

  getSearchedUserInfo(searchedUserName: string){
    this.userService.getUsersByUserName(searchedUserName).subscribe(response =>{
      let userInfo = response[0];
        console.log("Searched user's info-",userInfo);
        let fullName=userInfo.first_name.concat(" ",userInfo.last_name);
        this.searchedUserFullName=fullName.toUpperCase();  
        console.log("Searched user's info fullname-",this.searchedUserFullName);             
      });
  }


  likeTweet(tweetId : string){
    console.log(tweetId);
    this.tweetService.likeTweet(tweetId, this.searchedUserTweets).subscribe((response)=>{
      console.log(response);
      if(response == "success"){
        this.getAllTweets();
        this.likedTweetPopup = true;
        setTimeout(function() {
          console.log('hide');
          this.likedTweetPopup = false;
        }.bind(this), 3000);
      }
    },
    failureData => {
      console.log(failureData);
    });
  }


  isReplyClicked(index : number){
    console.log("In isReplyClicked()-",index);
    if(this.clickedReplyButton[index]==false){
    this.clickedReplyButton[index] = true;
  }
    else
    this.clickedReplyButton[index] = false;
  }

  convertToFormControl(absCtrl: AbstractControl | null): FormControl {
    const ctrl = absCtrl as FormControl;
    return ctrl;
  }

  replyTweet(tweetId : string){
    let reply = this.myFormGroup.controls['reply'].value;
    if(reply.length==0){
      alert("Reply can't be empty");
    }
    else{
        // alert("commented!");
        console.log(tweetId);
        console.log("in ViewUserTweets-replyTweet()-> loggedInUser's email-",this.user.email);
        this.tweetService.replyTweet(reply,tweetId,this.user.email).subscribe((response=>{
          console.log(response);
          if(response=="success"){
            this.myFormGroup.controls['reply'].reset();
            this.showElement = true;
            this.getAllTweets();
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
}

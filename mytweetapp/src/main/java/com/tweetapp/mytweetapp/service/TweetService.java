package com.tweetapp.mytweetapp.service;

import java.util.List;

import com.tweetapp.mytweetapp.dto.Reply;
import com.tweetapp.mytweetapp.dto.TweetDto;

public interface TweetService {
	
	List<TweetDto> getAllTweets();
	
	List<TweetDto> getAllTweetsByUserName(String userName, String loggedInUserId);
	
	TweetDto getTweet(String tweetId,String username);
	
	TweetDto postTweet(String userName, TweetDto tweetDto);
	
	TweetDto updateTweet(String userName, String id, TweetDto tweetDto);
	
	boolean deleteTweet(String userName, String id);
	
	TweetDto likeTweet(String userName, String tweetId);
	
	TweetDto replyToTweet(String userName, String tweetId, Reply replyTweet);

}

package com.tweetapp.mytweetapp.dto;

import com.tweetapp.mytweetapp.model.Tweet;

public class TweetMapper {
	
	public static TweetDto toTweetDto(Tweet tweet) {
		TweetDto tweetDto = new TweetDto();
		tweetDto.setId(tweet.getId());
		tweetDto.setDescription(tweet.getDescription());
		tweetDto.setUserId(tweet.getUserId());
		tweetDto.setLikes(tweet.getLikes());
		tweetDto.setReplies(tweet.getReplies());
		tweetDto.setCreatedOn(tweet.getCreatedOn());
		return tweetDto;
		
	}

}

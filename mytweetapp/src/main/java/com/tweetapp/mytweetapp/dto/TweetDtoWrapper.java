package com.tweetapp.mytweetapp.dto;

public class TweetDtoWrapper {

	private String userName;
	private TweetDto tweetDto;

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public TweetDto getTweetDto() {
		return tweetDto;
	}

	public void setTweetDto(TweetDto tweetDto) {
		this.tweetDto = tweetDto;
	}

	@Override
	public String toString() {
		return "TweetDtoWrapper [userName=" + userName + ", tweetDto=" + tweetDto + "]";
	}

}

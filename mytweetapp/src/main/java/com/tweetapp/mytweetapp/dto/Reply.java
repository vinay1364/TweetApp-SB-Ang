package com.tweetapp.mytweetapp.dto;

import java.time.LocalDateTime;

import io.swagger.annotations.ApiModelProperty;

public class Reply {

	@ApiModelProperty(notes = "Tweet Description",required = true)
	private String description;
	@ApiModelProperty(notes = "User's Name who replied")
	private String userName;
	@ApiModelProperty(notes = "Reply Created Date and Time",required = true)
	private LocalDateTime createdOn;

	public Reply() {
		super();
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public LocalDateTime getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}

	@Override
	public String toString() {
		return "Reply [description=" + description + ", userName=" + userName + ", createdOn=" + createdOn + "]";
	}

}

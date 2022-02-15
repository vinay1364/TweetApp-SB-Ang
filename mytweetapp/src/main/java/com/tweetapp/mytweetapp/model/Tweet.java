package com.tweetapp.mytweetapp.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.tweetapp.mytweetapp.dto.Reply;

@Document(value = "tweet")
public class Tweet {

	@Id
	private String id;
	private String description;
	private String userId;
	// @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME)
	@CreatedDate
	private LocalDateTime createdOn;

	private List<String> likes; // storing id of user's who liked tweet

	private List<Reply> replies;

	public Tweet() {
		super();
		likes = new ArrayList<String>();
		replies = new ArrayList<Reply>();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public LocalDateTime getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(LocalDateTime createdOn) {
		this.createdOn = createdOn;
	}

	public List<String> getLikes() {
		return likes;
	}

	public void setLikes(List<String> likes) {
		this.likes = likes;
	}
	
	public List<Reply> getReplies() {
		return replies;
	}

	public void setReplies(List<Reply> replies) {
		this.replies = replies;
	}

	@Override
	public String toString() {
		return "Tweet [id=" + id + ", description=" + description + ", userId=" + userId + ", createdOn=" + createdOn
				+ ", likes=" + likes + ", replies=" + replies + "]";
	}

}

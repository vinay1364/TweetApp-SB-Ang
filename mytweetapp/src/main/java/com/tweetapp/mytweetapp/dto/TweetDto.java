package com.tweetapp.mytweetapp.dto;

import java.time.LocalDateTime;
import java.util.List;

import io.swagger.annotations.ApiModelProperty;

public class TweetDto {

	@ApiModelProperty(notes = "The database generated Tweet Id")
	private String id;
	@ApiModelProperty(notes = "Tweet Description",required = true)
	private String description;
	@ApiModelProperty(notes = "User's Id who posted the Tweet")
	private String userId;
	@ApiModelProperty(notes = "Tweet Created Date and Time",required = true)
	private LocalDateTime createdOn;
	@ApiModelProperty(notes = "Tweet's Like Info")
	private List<String> likes; // storing id of user's who liked tweet
	@ApiModelProperty(notes = "Tweet's Reply Info")
	private List<Reply> replies;
	@ApiModelProperty(notes = "Tweet's Like Count")
	private Integer likesCount;
	@ApiModelProperty(notes = "Tweet's Reply Count")
	private Integer repliesCount;
	@ApiModelProperty(notes = "Tweet's Like Status")
	private Boolean likeStatus;

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
	
	public Integer getLikesCount() {
		return likesCount;
	}

	public void setLikesCount(Integer likesCount) {
		this.likesCount = likesCount;
	}
	

	public Integer getRepliesCount() {
		return repliesCount;
	}

	public void setRepliesCount(Integer repliesCount) {
		this.repliesCount = repliesCount;
	}

	public Boolean getLikeStatus() {
		return likeStatus;
	}

	public void setLikeStatus(Boolean likeStatus) {
		this.likeStatus = likeStatus;
	}

	@Override
	public String toString() {
		return "TweetDto [id=" + id + ", description=" + description + ", userId=" + userId + ", createdOn=" + createdOn
				+ ", likes=" + likes + ", replies=" + replies + ", likesCount=" + likesCount + ", repliesCount="
				+ repliesCount + ", likeStatus=" + likeStatus + "]";
	}
	
}

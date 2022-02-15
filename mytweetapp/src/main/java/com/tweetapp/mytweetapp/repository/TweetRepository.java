package com.tweetapp.mytweetapp.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.tweetapp.mytweetapp.model.Tweet;

public interface TweetRepository extends MongoRepository<Tweet, String> {
	
	List<Tweet> findAllByUserId(String userId);

}

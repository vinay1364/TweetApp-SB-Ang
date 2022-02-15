package com.tweetapp.mytweetapp.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.tweetapp.mytweetapp.dto.TweetDto;
import com.tweetapp.mytweetapp.dto.TweetDtoWrapper;
import com.tweetapp.mytweetapp.service.TweetService;

@Service
public class Consumer {

	private final Logger logger = LoggerFactory.getLogger(Consumer.class);
	
	private TweetService tweetService;
	
	@Autowired
	public Consumer(TweetService tweetService) {
		super();
		this.tweetService = tweetService;
	}

	@KafkaListener(topics = "tweet", groupId = "group_id")
	public void consume(String message) {
		logger.info("In Consumer method(), message received = '{}'", message);
		ObjectMapper mapper = new ObjectMapper();
		try {
			TweetDtoWrapper tweetDtoWrapper = mapper.readValue(message, TweetDtoWrapper.class);
			//call the tweetservice post() here
			// BrandEntity brand = brandService.addBrand(brandEntity);
			tweetService.postTweet(tweetDtoWrapper.getUserName(), tweetDtoWrapper.getTweetDto());
			logger.info("Successfully processed the tweet= '{}' ",tweetDtoWrapper.getTweetDto().getDescription());
		} catch (Exception e) {
			logger.error("An error occurred! '{}'", e.getMessage());
			e.printStackTrace();
		} 
		logger.info(String.format("Exiting the Consumer method"));
	}
}

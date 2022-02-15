package com.tweetapp.mytweetapp.kafka;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tweetapp.mytweetapp.dto.TweetDto;
import com.tweetapp.mytweetapp.dto.TweetDtoWrapper;

@Service
public class Producer {

	private static final Logger logger = LoggerFactory.getLogger(Producer.class);
	private static final String TOPIC = "tweet";

	@Autowired
	private KafkaTemplate<String, String> kafkaTemplate;
	// private KafkaTemplate<String, Book> kafkaTemplate;

	public void sendMessage(String userName, TweetDto tweetDto) {
		logger.info("In Producer method sending data to Kafka, userName = '{}',"
				+ "tweet='{}' , topic= '{}' ",userName, tweetDto.getDescription(),TOPIC);
		//this.kafkaTemplate.send(TOPIC, message);
		ObjectMapper mapper = new ObjectMapper();
		TweetDtoWrapper tweetDtoWrapper=new TweetDtoWrapper();
		tweetDtoWrapper.setUserName(userName);
		tweetDtoWrapper.setTweetDto(tweetDto);
		try {
			this.kafkaTemplate.send(TOPIC, mapper.writeValueAsString(tweetDtoWrapper));
		} catch (JsonProcessingException e) {
			logger.error("An error occurred! '{}'", e.getMessage());
			e.printStackTrace();
		}
	}
}

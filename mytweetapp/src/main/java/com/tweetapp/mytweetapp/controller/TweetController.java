package com.tweetapp.mytweetapp.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.mytweetapp.config.SwaggerConfig;
import com.tweetapp.mytweetapp.dto.CustomResponse;
import com.tweetapp.mytweetapp.dto.Reply;
import com.tweetapp.mytweetapp.dto.TweetDto;
import com.tweetapp.mytweetapp.kafka.Producer;
import com.tweetapp.mytweetapp.service.TweetServiceImpl;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1.0/tweets")
//@RequestMapping("/")
@Api(tags = { SwaggerConfig.TWEET_CONT_TAG })
public class TweetController {

	private static final Logger logger = LoggerFactory.getLogger(TweetController.class);

	// @Autowired
	private TweetServiceImpl tweetService;

	private Producer producer;

	@Autowired
	public TweetController(TweetServiceImpl tweetService, Producer producer) {
		super();
		this.tweetService = tweetService;
		this.producer = producer;
	}

	// Get All Tweets
	@ApiOperation(value = "Get list of all the Tweets", response = ResponseEntity.class)
	@GetMapping("/all")
	public ResponseEntity<?> getAllTweets() throws Exception {
		logger.debug("Get all the Tweets..");
		List<TweetDto> allTweets = tweetService.getAllTweets();
		logger.info("Returned all the Tweets.");
		return new ResponseEntity<List<TweetDto>>(allTweets, HttpStatus.OK);
	}

	// Get All Tweets of a user
	@ApiOperation(value = "Get all the Tweets of a User", response = ResponseEntity.class)
	@GetMapping("/{username}")
	public ResponseEntity<?> getAllTweetsByUserName(@PathVariable("username") String userName,
			@RequestHeader(value = "loggedInUser") String loggedInUser) { // loggedinuser= userId in db
		logger.debug("Get all the tweets of a user.. username={}, loggedInUser Id={}", userName, loggedInUser);
		// System.out.println("getAllTweetsByUserName() username->"+userName);
		// System.out.println("getAllTweetsByUserName() loggedInUser->"+loggedInUser);
		List<TweetDto> tweets = tweetService.getAllTweetsByUserName(userName, loggedInUser);
		// System.out.println("getAllTweetsByUserName() exit->"+tweets);
		logger.info("Returned the tweets of the user--{}", userName);
		return new ResponseEntity<List<TweetDto>>(tweets, HttpStatus.OK);
	}

	@ApiOperation(value = "Get all the details of a Tweet", response = ResponseEntity.class)
	//@GetMapping(value = "/tweets/{username}/{id}")
	@GetMapping(value = "/{username}/{id}")
	public ResponseEntity<?> getTweetDeatils(@PathVariable("username") String username,
			@PathVariable("id") String tweetId) {
		logger.debug("Get all the Details of a Tweet.. username={}, tweetId={}", username, tweetId);
		logger.info("Returned the tweet details for--{}", username, tweetId);
		return new ResponseEntity<TweetDto>(tweetService.getTweet(tweetId, username), HttpStatus.OK);
	}

	/*
	// Producer Kafka
	@PostMapping(value = "/publish")
	public void sendMessageToKafkaTopic(@RequestBody TweetDto tweetDto) {
		logger.info("Sending data to kafka Producer method..");
		try {
			this.producer.sendMessage(tweetDto);
		} catch (Exception e) {
			logger.error("An error occurred! {}", e.getMessage());
		}
		logger.info("Message Successfully Sent to Kafka.");
	}
	*/

	// Post new Tweet using Kafka
	@ApiOperation(value = "Post a new Tweet", response = ResponseEntity.class)
	//@PostMapping("/tweets/{username}/add")
	@PostMapping("/{username}/add")
	public ResponseEntity<?> postTweet(@PathVariable("username") String userName, @RequestBody TweetDto tweetDto) {
		logger.debug("Posting a new Tweet .. username={}, tweet={}", userName, tweetDto);
		logger.info("Sending data to kafka Producer method..");
		try {
			this.producer.sendMessage(userName, tweetDto);
		} catch (Exception e) {
			logger.error("An error occurred! {}", e.getMessage());
		}
		//logger.info("Message Successfully Sent to Kafka.");
		logger.info("Tweet Posted Successfully.");
		
		return new ResponseEntity<>(new CustomResponse(201,"Created the Tweet."), HttpStatus.CREATED);
	}

	/*
	 * // Post new Tweet
	 * 
	 * @ApiOperation(value = "Post a new Tweet", response = ResponseEntity.class)
	 * 
	 * @PostMapping("/tweets/{username}/add") public ResponseEntity<?>
	 * postTweet(@PathVariable("username") String userName, @RequestBody TweetDto
	 * tweetDto) { logger.debug("Posting a new Tweet .. username={}, tweet={}",
	 * userName, tweetDto); //
	 * System.out.println("postTweet() username->"+userName); //
	 * System.out.println("postTweet() twetDto->"+tweetDto);
	 * logger.info("Tweet Posted Successfully."); return new
	 * ResponseEntity<TweetDto>(tweetService.postTweet(userName, tweetDto),
	 * HttpStatus.CREATED); }
	 */

	// Update Tweet
	@ApiOperation(value = "Update a Tweet", response = ResponseEntity.class)
	//@PutMapping("/tweets/{username}/update/{id}") // username path variable is required?
	@PutMapping("/{username}/update/{id}")
	public ResponseEntity<?> updateTweet(@PathVariable("username") String userName, @PathVariable("id") String tweetId,
			@RequestBody TweetDto tweetDto) {
		logger.debug("Updating a Tweet .. username={}, tweetId={}, tweet={}", userName, tweetId, tweetDto);
		logger.info("Tweet Updated Successfully.");
		return new ResponseEntity<TweetDto>(tweetService.updateTweet(userName, tweetId, tweetDto), HttpStatus.OK);
	}

	// Delete Tweet
	@ApiOperation(value = "Delete a Tweet", response = ResponseEntity.class)
	//@DeleteMapping("/tweets/{username}/delete/{id}") 
	@DeleteMapping("/{username}/delete/{id}")
	public ResponseEntity<?> deleteTweet(@PathVariable("username") String userName,
			@PathVariable("id") String tweetId) {
		boolean status = false;
		logger.debug("Deleting a Tweet .. username={}, tweetId={}", userName, tweetId);
		status = tweetService.deleteTweet(userName, tweetId);
		logger.info("Tweet Deleted Successfully.");
		return new ResponseEntity<Boolean>(status, HttpStatus.OK);
	}

	// Like Tweet
	@ApiOperation(value = "Like a Tweet", response = ResponseEntity.class)
	//@PutMapping("/tweets/{username}/like/{id}")
	@PutMapping("/{username}/like/{id}")
	public ResponseEntity<?> likeTweet(@PathVariable("username") String userName, @PathVariable("id") String tweetId) {
		logger.debug("Liked a Tweet .. username={}, tweetId={}", userName, tweetId);
		logger.info("Tweet Liked Successfully.");
		return new ResponseEntity<TweetDto>(tweetService.likeTweet(userName, tweetId), HttpStatus.OK);
	}

	// Reply to Tweet
	@ApiOperation(value = "Reply to a Tweet", response = ResponseEntity.class)
	//@PostMapping("/tweets/{username}/reply/{id}")
	@PostMapping("/{username}/reply/{id}")
	public ResponseEntity<?> replyToTweet(@PathVariable("username") String userName, @PathVariable("id") String tweetId,
			@RequestBody Reply replyTweet) {
		logger.debug("Reply a Tweet .. username={}, tweetId={}", userName, tweetId);
		return new ResponseEntity<TweetDto>(tweetService.replyToTweet(userName, tweetId, replyTweet), HttpStatus.OK);
	}

}

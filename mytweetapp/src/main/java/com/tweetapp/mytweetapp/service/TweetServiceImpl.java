package com.tweetapp.mytweetapp.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tweetapp.mytweetapp.dto.Reply;
import com.tweetapp.mytweetapp.dto.TweetDto;
import com.tweetapp.mytweetapp.dto.TweetMapper;
import com.tweetapp.mytweetapp.exception.ElementNotFoundException;
import com.tweetapp.mytweetapp.exception.InvalidUsernameException;
import com.tweetapp.mytweetapp.model.Tweet;
import com.tweetapp.mytweetapp.model.User;
import com.tweetapp.mytweetapp.repository.TweetRepository;
import com.tweetapp.mytweetapp.repository.UserRepository;

@Service
public class TweetServiceImpl implements TweetService {
	
	private static final Logger logger = LoggerFactory.getLogger(TweetServiceImpl.class);

	//@Autowired
	private TweetRepository tweetRepository;

	//@Autowired
	private UserRepository userRepository; // this may not be needed in this class		

	@Autowired
	public void setTweetRepository(TweetRepository tweetRepository) {
		this.tweetRepository = tweetRepository;
		//System.out.println("In setTweetRepository() -> tweetRepository object created-" + (tweetRepository!=null));
	}

	@Autowired
	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
		//System.out.println("In setTweetRepository() -> userRepository object created-" + (userRepository!=null));
	}
	

	@Override
	public List<TweetDto> getAllTweets(){
		logger.debug("In Service class - Get all the Tweets..");
		List<TweetDto> tweetsDto = new ArrayList<TweetDto>();
		List<Tweet> allTweets = tweetRepository.findAll();
		if (allTweets.size() <= 0) {
			logger.error("An Exception thrown in getAllTweets().");	
			throw new ElementNotFoundException("Couldn't find any Tweet. Please try again.");
		}
			
		for (Tweet t : allTweets) {
			tweetsDto.add(TweetMapper.toTweetDto(t));
		}
		logger.info("Fetched all the tweets..");
		return tweetsDto;
	}

	@Override
	public List<TweetDto> getAllTweetsByUserName(String userName, String loggedInUserId) {
		logger.debug("In Service class -Get All the Tweeets By Username --username={}, loggedInUserId={}",userName,loggedInUserId);
		if (userName.isEmpty())
			throw new InvalidUsernameException("Username can't be empty.Please enter a valid Username.");

		//List<TweetDto> tweetsDto = new ArrayList<TweetDto>();
		User user = userRepository.findByEmail(userName);
		if (user != null) {
			List<Tweet> tweets = tweetRepository.findAllByUserId(user.getId());
			if(tweets.isEmpty()) {
				logger.error("An Exception thrown in getAllTweetsByUserName()- No Tweet found.");
				throw new ElementNotFoundException("Couldn't find any tweet. Please post a new tweet.");
			}
				
			
			List<TweetDto> tweetResponse = tweets.stream().map(tweet ->{
				Integer likesCount = tweet.getLikes().size();
				Boolean likeStatus = tweet.getLikes().contains(loggedInUserId);
				Integer repliesCount = tweet.getReplies().size();
				return createTweetDto(tweet,likesCount,likeStatus,repliesCount);
			}).collect(Collectors.toList());
			
//			for (Tweet t : tweets) {
//				tweetsDto.add(TweetMapper.toTweetDto(t));
//			}
			logger.info("Fetched all the tweets..");
			return tweetResponse;
		} else {
			logger.error("An Exception thrown in getAllTweetsByUserName()- No User found.");
			throw new ElementNotFoundException("Couldn't find the user. Please Enter valid username.");
		}
			
	}
	
	//Method to get tweet by id
	@Override
	public TweetDto getTweet(String tweetId,String username){
		logger.debug("In Service class - Get Tweet Details --tweetId={}, username={}",tweetId,username);
		Optional<Tweet> tweetFounded =  tweetRepository.findById(tweetId);
		User user = userRepository.findByEmail(username);
		if(tweetFounded.isPresent()) {
			Tweet tweet = tweetFounded.get();
			Integer likesCount = tweet.getLikes().size();
			Boolean likeStatus = tweet.getLikes().contains(user.getId());
			Integer repliesCount = tweet.getReplies().size();
			logger.info("Fetched the tweet details..");
			return createTweetDto(tweet,likesCount,likeStatus,repliesCount);
		}else {
			logger.error("An Exception thrown in getTweet().");
			throw new ElementNotFoundException("The tweet does not exist anymore.");
		}
		
	}
	
	private TweetDto createTweetDto(Tweet tweet,Integer likesCount, Boolean likeStatus, Integer repliesCount) {
		logger.debug("In Service class - Tweet Model to TweetDto Mapper function..");
		TweetDto tweetDto=new TweetDto();
		
		tweetDto.setId(tweet.getId());
		tweetDto.setDescription(tweet.getDescription());
		tweetDto.setUserId(tweet.getUserId());
		tweetDto.setCreatedOn(tweet.getCreatedOn());
		tweetDto.setLikes(tweet.getLikes());
		tweetDto.setReplies(tweet.getReplies());		
		tweetDto.setLikesCount(likesCount);
		tweetDto.setRepliesCount(repliesCount);
		tweetDto.setLikeStatus(likeStatus);
		logger.debug("Exit createTweetDto() method.");
		return tweetDto;		
	}


	@Override
	public TweetDto postTweet(String userName, TweetDto tweetDto) {
		logger.debug("In Service class - Post new tweet -- username={},tweet={}",userName,tweetDto);
		Tweet tweet = new Tweet();
		tweet.setDescription(tweetDto.getDescription());
		tweet.setUserId(tweetDto.getUserId());
		tweet.setCreatedOn(LocalDateTime.now());
		logger.info("Tweet Saved Successfully.");
		return TweetMapper.toTweetDto(tweetRepository.save(tweet));
	}


	@Override
	public TweetDto updateTweet(String userName, String tweetId, TweetDto tweetDto) {
		logger.debug("In Service class - Updating the tweet -- username={},tweetId={},tweet={}",userName,tweetId,tweetDto);
		Optional<Tweet> tweetData = tweetRepository.findById(tweetId);

		if (!tweetData.isPresent()) {
			logger.error("An Exception thrown in updateTweet().");
			throw new ElementNotFoundException("Tweet doesn't exist.");
		}		

		Tweet userTweet = tweetData.get();
		userTweet.setDescription(tweetDto.getDescription());
		logger.info("Updated Tweet saved.");
		return TweetMapper.toTweetDto(tweetRepository.save(userTweet));
	}


	@Override
	public boolean deleteTweet(String userName, String tweetId) {
		logger.debug("In Service class - Delete tweet -- username={},tweetId={}",userName,tweetId);
		Optional<Tweet> tweetData = tweetRepository.findById(tweetId);
		if (!tweetData.isPresent()) {
			logger.error("An Exception thrown in deleteTweet().");
			throw new ElementNotFoundException("Tweet doesn't exist.");
		}
		logger.info("Tweet deleted..");
		tweetRepository.deleteById(tweetId);
		return true;
	}
	

	@Override
	public TweetDto likeTweet(String userName, String tweetId) {
		logger.debug("In Service class - Like tweet -- username={},tweetId={}",userName,tweetId);
		User user = userRepository.findByEmail(userName);
		String userId = user.getId();

		Optional<Tweet> tweetById = tweetRepository.findById(tweetId);
		if (!tweetById.isPresent()) {
			logger.error("An Exception thrown in likeTweet().");
			throw new ElementNotFoundException("Tweet doesn't exist.");
		}			
		
		Tweet tweet = tweetById.get();
		List<String> likes = tweet.getLikes();
		likes.add(userId);

		tweet.setLikes(likes);
		logger.info("Tweet Liked..");
		return TweetMapper.toTweetDto(tweetRepository.save(tweet));
	}

	@Override
	public TweetDto replyToTweet(String userName, String tweetId, Reply replyTweet) {
		logger.debug("In Service class - Reply to tweet -- username={},tweetId={},replyTweet={}",userName,tweetId,replyTweet);
		User user = userRepository.findByEmail(userName);
		String fullName = user.getFirst_name() + " " + user.getLast_name();

		Optional<Tweet> tweetById = tweetRepository.findById(tweetId);
		if (!tweetById.isPresent()) {
			logger.error("An Exception thrown in replyToTweet().");
			throw new ElementNotFoundException("Tweet doesn't exist.");
		}
			
		
		Reply reply = new Reply();
		reply.setDescription(replyTweet.getDescription());
		reply.setUserName(fullName);
		reply.setCreatedOn(LocalDateTime.now());

		Tweet tweet = tweetById.get();
		tweet.getReplies().add(reply);
		logger.info("Replied to Tweet..");
		return TweetMapper.toTweetDto(tweetRepository.save(tweet));
	}

}

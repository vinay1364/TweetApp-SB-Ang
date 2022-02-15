package com.tweetapp.mytweetapp.controller;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tweetapp.mytweetapp.config.SwaggerConfig;
import com.tweetapp.mytweetapp.dto.ResponseError;
import com.tweetapp.mytweetapp.dto.UserDto;
import com.tweetapp.mytweetapp.exception.UserNameAlreadyExistsException;
import com.tweetapp.mytweetapp.service.UserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
//@RequestMapping("/api/v1.0/tweets")
@RequestMapping("/")
@Api(tags = { SwaggerConfig.USER_CONT_TAG })
public class UserController {

	private static final Logger logger = LoggerFactory.getLogger(UserController.class);

	private UserService userService;

	@Autowired
	public UserController(UserService userService) {
		super();
		this.userService = userService;
//		System.out.println("In TweetAppController constructor-> userService object created-" + (userService!=null));
//		System.out.println("In TweetAppController constructor-> tweetService object created-" + (tweetService!=null));
	}

	// Register new User
	@ApiOperation(value = "Register a new User", response = ResponseEntity.class)
	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@RequestBody UserDto userDto) {
		//logger.trace("Entering Controller method - registerUser()");
		logger.debug("Register the new user--{}",userDto.getEmail());
		try {
			//System.out.println("registerUser() REquest->" + userDto.toString());
			UserDto registeredUser = userService.registerUser(userDto);
			logger.info("User Registered Successfully.");
			return new ResponseEntity<UserDto>(registeredUser, HttpStatus.CREATED);
		} catch (UserNameAlreadyExistsException e) {
			logger.error("An Exception Occurred in registerUser() --{}",e);
			return new ResponseEntity<>(new ResponseError(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	

	// Login the User
	@ApiOperation(value = "Login a User", response = ResponseEntity.class)
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody UserDto userDto) {
		//System.out.println("LoginUSer() REquest->" + userDto.toString());
		logger.debug("Login the user--{}",userDto.getEmail());
		UserDto loginUser = userService.loginUser(userDto);		
		//System.out.println("LoginUSer() Success->" + loginUser.toString());
		logger.info("User Logged In Successfully.");
		return new ResponseEntity<UserDto>(loginUser, HttpStatus.OK);
	}

	// Logout the User
	@ApiOperation(value = "Logout a User", response = ResponseEntity.class)
	@GetMapping("/logout/{username}")
	public ResponseEntity<?> logoutUser(@PathVariable("username") String userName) {
		boolean loggedOut = false;
		logger.debug("Loggin Out the user--{}",userName);	
		loggedOut = userService.logoutUser(userName);
		logger.info("User Logged Out Successfully.");
		return new ResponseEntity<>(loggedOut, HttpStatus.OK);
		//return new ResponseEntity<>(HttpStatus.OK);
	}
	
	// Forgot Password
	@ApiOperation(value = "Forgot Password Api", response = ResponseEntity.class)
	@PutMapping("/{username}/forgot")
	public ResponseEntity<?> forgotPassword(@PathVariable("username") String userName, @RequestBody UserDto userDto) {
		logger.debug("Using Forgot Password--{}",userDto.getEmail());
		//System.out.println("forgotPassword() REquest->" + userDto.toString());
		UserDto user = userService.forgotPassword(userName, userDto);
		logger.info("Forgot Password completed Successfully.");
		return new ResponseEntity<UserDto>(user, HttpStatus.OK);
	}


	// Get All USers
	@ApiOperation(value = "Get list of all the Users", response = ResponseEntity.class)
	@GetMapping("/users/all")
	public ResponseEntity<?> getAllUsers() {
		logger.debug("Fetching All the Users..");
		List<UserDto> allUsers = userService.getAllUsers();
		logger.info("Returning all the users list.");
		return new ResponseEntity<List<UserDto>>(allUsers, HttpStatus.OK);
	}

	// Get user by Username, username may be partial or complete
	@ApiOperation(value = "Search a User", response = ResponseEntity.class)
	@GetMapping("/user/search/{username}")
	public ResponseEntity<?> getUser(@PathVariable("username") String userName) {
		logger.debug("Searching the users matching the username= {}",userName);
		List<UserDto> users = userService.getUser(userName);
		logger.info("Returning the matching users list.");
		return new ResponseEntity<List<UserDto>>(users, HttpStatus.OK);
	}

}

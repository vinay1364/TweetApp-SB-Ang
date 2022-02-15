package com.tweetapp.mytweetapp.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tweetapp.mytweetapp.dto.UserDto;
import com.tweetapp.mytweetapp.dto.UserMapper;
import com.tweetapp.mytweetapp.exception.ElementNotFoundException;
import com.tweetapp.mytweetapp.exception.InvalidUsernameException;
import com.tweetapp.mytweetapp.exception.UserNameAlreadyExistsException;
import com.tweetapp.mytweetapp.model.User;
import com.tweetapp.mytweetapp.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {
	private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
		
	private UserRepository userRepository;
	
	@Autowired
	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
		//System.out.println("In setUserRepository() -> userRepository object created-" + (userRepository!=null));
	}	

	@Override
	public UserDto registerUser(UserDto userDto) {
		logger.debug("In Service class - Register the new user--{}",userDto.getEmail());
		User userExists = userRepository.findByEmail(userDto.getEmail());

		if (userExists != null) {
			logger.error("An Exception thrown in registerUser().");
			throw new UserNameAlreadyExistsException("Username Already Exists");			
		}

		User newUser = new User();
		newUser.setFirst_name(userDto.getFirst_name());
		newUser.setLast_name(userDto.getLast_name());
		newUser.setGender(userDto.getGender());
		newUser.setDob(userDto.getDob());
		newUser.setEmail(userDto.getEmail());
		newUser.setPassword(userDto.getPassword());
		newUser.setStatus(false);
		newUser.setContactNumber(userDto.getContactNumber());
		
		logger.info("User saved in DB.");
		return UserMapper.toUserDto(userRepository.save(newUser));
	}

	@Override
	public UserDto loginUser(UserDto userDto) {
		logger.debug("In Service class - Logging In the User --{}",userDto.getEmail());
		User user = userRepository.findByEmailAndPassword(userDto.getEmail(), userDto.getPassword());

		if (user == null) {
			logger.error("An Exception thrown in loginUser().");
			throw new ElementNotFoundException("User Doesnot Exists. Please try again.");
		}
			
		user.setStatus(true); // user loggedin
		User loggedInUser = userRepository.save(user);
		logger.info("User Login status updated Successfully.");
		return UserMapper.toUserDto(loggedInUser);
	}

	@Override
	public boolean logoutUser(String userName) {
		logger.debug("In Service class - Logging Out the user--{}",userName);
		User u = userRepository.findByEmail(userName);
		if (u != null) {
			u.setStatus(false);
			userRepository.save(u);
			logger.info("User Logout Status updated Successfully.");
			return true;
		}
		logger.error("Couldn't Logout the User.");
		return false;
	}
	

	@Override
	public UserDto forgotPassword(String userName, UserDto userDto) {
		logger.debug("In Service class - Forgot Passwordr--{}",userDto.getEmail());
		User u = userRepository.findByEmail(userName);
		if (u == null) {
			logger.error("An Exception thrown in forgotPassword()");
			throw new ElementNotFoundException("Incorrect Username. Please enter a valid email..");
		}
		u.setPassword(userDto.getPassword());
		userRepository.save(u);
		logger.info("New Password saved Successfully.");
		return UserMapper.toUserDto(u);
	}

	@Override
	public List<UserDto> getAllUsers() {
		logger.debug("In Service class - Get all the users..");

		List<UserDto> usersDto = new ArrayList<UserDto>();
		List<User> users = userRepository.findAll();
		for (User u : users) {
			usersDto.add(UserMapper.toUserDto(u));
		}
		logger.info("Fetched all the users list..");
		return usersDto;
	}
	
	@Override
	public List<UserDto> getUser(String userName) {
		logger.debug("In Service class - Get the user--{}",userName);
		List<UserDto> usersDto = new ArrayList<UserDto>();
		if (userName.isEmpty()) {
			logger.error("An Exception thrown in getUser()-- Invalid UserName");
			throw new InvalidUsernameException("Username can't be empty.Please enter a valid Username.");
		}			
		
		//List<User> matchedUsers = userRepository.findByEmailLike(userName);
		List<User> matchedUsers = userRepository.findUsersByEmail(userName);
		if (matchedUsers.size() <= 0) {
			logger.error("An Exception thrown in getUser()-- No User Found");
			throw new ElementNotFoundException("No User Found");			
		}

		for (User u : matchedUsers) {
			usersDto.add(UserMapper.toUserDto(u));
		}
		logger.info("Fetched all the matching users list..");
		return usersDto;
	}
}

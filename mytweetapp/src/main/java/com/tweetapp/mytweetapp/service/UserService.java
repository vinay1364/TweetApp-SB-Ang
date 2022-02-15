package com.tweetapp.mytweetapp.service;

import java.util.List;

import com.tweetapp.mytweetapp.dto.UserDto;

public interface UserService {
	
	UserDto registerUser(UserDto userDto);
	
	UserDto loginUser(UserDto userDto);
	
	boolean logoutUser(String userName);
	
	UserDto forgotPassword(String userName, UserDto userDto);
	
	List<UserDto> getAllUsers();
	
	List<UserDto> getUser(String userName);

}

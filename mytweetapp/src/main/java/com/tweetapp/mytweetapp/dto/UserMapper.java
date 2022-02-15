package com.tweetapp.mytweetapp.dto;

import com.tweetapp.mytweetapp.model.User;

public class UserMapper {
	
	public static UserDto toUserDto(User user) {
		UserDto userDto=new UserDto();
		userDto.setId(user.getId());
		userDto.setFirst_name(user.getFirst_name());
		userDto.setLast_name(user.getLast_name());
		userDto.setDob(user.getDob());
		userDto.setGender(user.getGender());
		userDto.setEmail(user.getEmail());
		userDto.setPassword(user.getPassword());
		userDto.setContactNumber(user.getContactNumber());
		
		return userDto;
		
	}

}

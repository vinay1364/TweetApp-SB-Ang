package com.tweetapp.mytweetapp.exception;

public class UserNameAlreadyExistsException extends RuntimeException {
	
	public UserNameAlreadyExistsException(String message) {
		super(message);
	}

}

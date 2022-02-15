package com.tweetapp.mytweetapp.exception.handler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.tweetapp.mytweetapp.dto.ResponseError;
import com.tweetapp.mytweetapp.exception.ElementNotFoundException;
import com.tweetapp.mytweetapp.exception.InvalidUsernameException;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {
	
	private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

	@ExceptionHandler(ElementNotFoundException.class)
	public ResponseEntity<Object> handleElementNotFoundExceptions(ElementNotFoundException exception) {
		return new ResponseEntity<Object>(new ResponseError(exception.getMessage()), HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(InvalidUsernameException.class)
	public ResponseEntity<Object> handleInvalidUsernameExceptions(InvalidUsernameException exception) {
		return new ResponseEntity<Object>(new ResponseError(exception.getMessage()), HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<Object> handleExceptions(Exception exception) {
		logger.error("Exception handled by GlobalExceptionHandler--exception-{}",exception);
		return new ResponseEntity<Object>(new ResponseError("Business Processing Exception."),
				HttpStatus.INTERNAL_SERVER_ERROR);
	}

}
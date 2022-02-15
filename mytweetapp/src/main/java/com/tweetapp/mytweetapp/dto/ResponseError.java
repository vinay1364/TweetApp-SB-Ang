package com.tweetapp.mytweetapp.dto;

public class ResponseError {

	private String response;

	public ResponseError() {
		super();
	}

	public ResponseError(String response) {
		super();
		this.response = response;
	}

	public String getResponse() {
		return response;
	}

	public void setResponse(String response) {
		this.response = response;
	}

	@Override
	public String toString() {
		return "ResponseError [response=" + response + "]";
	}

}

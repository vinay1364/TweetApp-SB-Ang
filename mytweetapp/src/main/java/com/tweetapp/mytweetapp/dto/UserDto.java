package com.tweetapp.mytweetapp.dto;

import io.swagger.annotations.ApiModelProperty;

public class UserDto {

	@ApiModelProperty(notes = "The database generated User Id")
	private String id;
	
	@ApiModelProperty(notes = "User's First Name",required = true)
	private String first_name;
	@ApiModelProperty(notes = "User's Last Name",required = true)
	private String last_name;
	@ApiModelProperty(notes = "User's Gender",required = true)
	private String gender;
	@ApiModelProperty(notes = "User's DOB",required = true)
	private String dob;
	@ApiModelProperty(notes = "User's Email Address",required = true)
	private String email;
	@ApiModelProperty(notes = "User's Password",required = true)
	private String password;
	@ApiModelProperty(notes = "User's Contact Number",required = true)
	private String contactNumber;

	public UserDto() {
		super();
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getFirst_name() {
		return first_name;
	}

	public void setFirst_name(String first_name) {
		this.first_name = first_name;
	}

	public String getLast_name() {
		return last_name;
	}

	public void setLast_name(String last_name) {
		this.last_name = last_name;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	@Override
	public String toString() {
		return "UserDto [id=" + id + ", first_name=" + first_name + ", last_name=" + last_name + ", gender=" + gender
				+ ", dob=" + dob + ", email=" + email + ", password=" + password + ", contactNumber=" + contactNumber
				+ "]";
	}

}

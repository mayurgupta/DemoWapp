/**
 * 
 */
package com.trucktrans.entity.web;

import com.trucktrans.entity.dto.UserDTO;

/**
 * @author Mayur
 * 5:01:28 pm, 20-Sep-2015
 *
 */
public class WUserDetails {

	Long id;
	String pincode;
	String state;
	String city;
	String landMark;
	String primaryPhone;
	String secondaryPhone;
	
	private String login;
	private String screenName;
	private String email;
	private String screenImage;
	private Long userId;
	
	
	
	

	public String getState() {
		return state;
	}

	public void setState(String state) {
		this.state = state;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getLandMark() {
		return landMark;
	}

	public void setLandMark(String landMark) {
		this.landMark = landMark;
	}

	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPincode() {
		return pincode;
	}

	public void setPincode(String pincode) {
		this.pincode = pincode;
	}

	public String getPrimaryPhone() {
		return primaryPhone;
	}

	public void setPrimaryPhone(String primaryPhone) {
		this.primaryPhone = primaryPhone;
	}

	public String getSecondaryPhone() {
		return secondaryPhone;
	}

	public void setSecondaryPhone(String secondaryPhone) {
		this.secondaryPhone = secondaryPhone;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getScreenName() {
		return screenName;
	}

	public void setScreenName(String screenName) {
		this.screenName = screenName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getScreenImage() {
		return screenImage;
	}

	public void setScreenImage(String screenImage) {
		this.screenImage = screenImage;
	}

}

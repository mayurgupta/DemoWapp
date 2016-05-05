/**
 * 
 */
package com.trucktrans.entity.web;

/**
 * @author Mayur
 * 5:01:28 pm, 20-Sep-2015
 *
 */
public class WUserDetails {

	private String login;
	private String screenName;
	private String email;
	private String screenImage;
	private Long userId;
	
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

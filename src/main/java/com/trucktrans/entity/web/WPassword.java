/**
 * 
 */
package com.trucktrans.entity.web;

/**
 * Object to inject form data for password change
 * 
 * @author Mayur
 * 5:00:40 pm, 20-Sep-2015
 *
 */
public class WPassword {

	private String oldPassword;

	private String newPassword;

	private String confirmPassword;
	
	private String userName;
	
	private String email;

	public String getOldPassword() {
		return oldPassword;
	}

	public void setOldPassword(String oldPassword) {
		this.oldPassword = oldPassword;
	}

	public String getNewPassword() {
		return newPassword;
	}

	public void setNewPassword(String newPassword) {
		this.newPassword = newPassword;
	}

	public String getConfirmPassword() {
		return confirmPassword;
	}

	public void setConfirmPassword(String confirmPassword) {
		this.confirmPassword = confirmPassword;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Override
	public String toString() {
		return "WPassword [oldPassword=" + oldPassword + ", newPassword="
				+ newPassword + ", confirmPassword=" + confirmPassword
				+ ", userName=" + userName + ", email=" + email + "]";
	}
}
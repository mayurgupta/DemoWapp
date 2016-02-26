/**
 * 
 */
package com.trucktrans.entity.web;

import java.util.List;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

/**
 * @author mgupta
 *
 */
public class WUserProfile {

	@NotNull(message = "can not be null")
	@Min(value = 6, message = "min=6")
	@Max(value = 20, message = "max=20")
	private String userName;

//	@JsonIgnore
	@NotNull(message = "can not be null")
	@Min(value = 6, message = "min=6")
	@Max(value = 20, message = "max=20")
	private String password;

//	@JsonIgnore
	@NotNull(message = "can not be null")
	private String password1;
	

	@NotNull(message = "can not be null")
	@Max(value = 20, message = "max=20")
	private String name;
	@NotNull(message = "email cannot be null")
	private String email;
	private String companyDesc;
	

	private boolean pwdChanged;

	
	public String getCompanyDesc() {
		return companyDesc;
	}
	
	public void setCompanyDesc(String companyDesc) {
		this.companyDesc = companyDesc;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getPassword1() {
		return password1;
	}

	public void setPassword1(String password1) {
		this.password1 = password1;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isPwdChanged() {
		return pwdChanged;
	}

	public void setPwdChanged(boolean pwdChanged) {
		this.pwdChanged = pwdChanged;
	}
	
	
	
	
}

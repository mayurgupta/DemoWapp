/**
 * 
 */
package com.trucktrans.entity.web;

import java.util.List;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import org.codehaus.jackson.annotate.JsonIgnore;

import com.trucktrans.entity.dto.UserDTO;

/**
 * @author Mayur
 * 5:01:14 pm, 20-Sep-2015
 *
 */
public class WUser {

	/*@NotNull(message = "can not be null")
	@Min(value = 6, message = "min=6")
	@Max(value = 20, message = "max=20")
	private String userName;
*/
//	@JsonIgnore
	@NotNull(message = "can not be null")
	@Min(value = 6, message = "min=6")
	@Max(value = 20, message = "max=20")
	private String password;

//	@JsonIgnore
	@NotNull(message = "can not be null")
	private String password1;
	
	private List<Long> auths;

	@NotNull(message = "can not be null")
	@Max(value = 20, message = "max=20")
	private String name;
	@NotNull(message = "email cannot be null")
	private String email;
	
	private boolean pwdChanged;

	public WUser() {

	}

	public WUser(UserDTO user) {
		this.name = user.getName();
//		this.userName = user.getUserName();
		this.email = user.getEmail();
	}

/*	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
*/
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


	public List<Long> getAuths() {
		return auths;
	}

	public void setAuths(List<Long> auths) {
		this.auths = auths;
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

	@Override
	public String toString() {
		StringBuilder builder = new StringBuilder();
//		builder.append("WUser [userId=");
//		builder.append(userName);
		builder.append(", password=");
		builder.append(password);
		builder.append(", password1=");
		builder.append(password1);
		builder.append(", auths=");
		builder.append(auths);
		builder.append(", name=");
		builder.append(name);
		builder.append("]");
		return builder.toString();
	}

}

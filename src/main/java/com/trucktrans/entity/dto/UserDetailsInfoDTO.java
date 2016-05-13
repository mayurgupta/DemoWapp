/**
 * 
 */
package com.trucktrans.entity.dto;

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;

/**
 * @author Mayur 
 * Time:2:13:30 am,  08-May-2016
 * 
 */

@Entity
@Table(name = "tt_user_details_info", catalog = "trucksys")
public class UserDetailsInfoDTO implements java.io.Serializable{

	
	private static final long serialVersionUID = 1L;
	
	Long id;
	Integer pincode;
	String state;
	String city;
	String landMark;
	Long primaryPhone;
	Long secondaryPhone;
	UserDTO user;
	
	
	public UserDetailsInfoDTO() {

	}
	
	
	
	
	
	public UserDetailsInfoDTO(Long id, Integer pincode, String state, String city, String landMark,
			Long primaryPhone, Long secondaryPhone, UserDTO user) {
		super();
		this.id = id;
		this.pincode = pincode;
		this.state = state;
		this.city = city;
		this.landMark = landMark;
		this.primaryPhone = primaryPhone;
		this.secondaryPhone = secondaryPhone;
		this.user = user;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "USER_DETAILS_ID", unique = true, nullable = false)
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	
	@Column(name = "PINCODE", length = 6)
	public Integer getPincode() {
		return pincode;
	}
	public void setPincode(Integer pincode) {
		this.pincode = pincode;
	}
	
	@Column(name = "STATE", length = 6)
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	
	@Column(name = "CITY", length = 6)
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	
	@Column(name = "LANDMARK", length = 6)
	public String getLandMark() {
		return landMark;
	}
	public void setLandMark(String landMark) {
		this.landMark = landMark;
	}
	
	@Column(name = "PRIMARY_PHONE_NO", length = 6)
	public Long getPrimaryPhone() {
		return primaryPhone;
	}
	public void setPrimaryPhone(Long primaryPhone) {
		this.primaryPhone = primaryPhone;
	}
	
	@Column(name = "SECONDARY_PHONE_NO", length = 6)
	public Long getSecondaryPhone() {
		return secondaryPhone;
	}
	public void setSecondaryPhone(Long secondaryPhone) {
		this.secondaryPhone = secondaryPhone;
	}
	
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID")	
	public UserDTO getUser() {
		return user;
	}
	public void setUser(UserDTO user) {
		this.user = user;
	}
	
	/*USER_ID*/
	
	
	
}

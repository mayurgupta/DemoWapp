package com.trucktrans.entity.dto;

// Generated 12 Oct, 2015 11:47:03 PM by Hibernate Tools 3.4.0.CR1

import static javax.persistence.GenerationType.IDENTITY;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

/**
 * TtUser generated by hbm2java
 */
@Entity
@Table(name = "tt_user", catalog = "trucksys", uniqueConstraints = @UniqueConstraint(columnNames = "EMAIL"))
public class UserDTO implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private long userId;
	private String email;
	private Boolean enabled;
	private String name;
	private String password;
	private String userName;
	private String createdBy;
	private Date createdDate;
	private String updatedBy;
	private Date updatedDate;
	private Boolean passwordChanged;
	private Set<AppTrackInfoDTO> appTrackInfoDTOs = new HashSet<AppTrackInfoDTO>(0);
	private Set<UserRolesREF> UserRolesREFs = new HashSet<UserRolesREF>(0);
	private Set<UserBookingReqDTO> userBookingReqDTOs = new HashSet<UserBookingReqDTO>(0);
	private Set<TransComDetailsDTO> transComDetailsDTOs = new HashSet<TransComDetailsDTO>(0);

	public UserDTO() {
	}

	public UserDTO(long userId, String email, String name, String password, String userName) {
		this.userId = userId;
		this.email = email;
		this.name = name;
		this.password = password;
		this.userName = userName;
	}

	public UserDTO(long userId, String email, Boolean enabled, String name, String password, String userName,
			String createdBy, Date createdDate, String updatedBy, Date updatedDate, Boolean passwordChanged,
			Set<AppTrackInfoDTO> appTrackInfoDTOs, Set<UserRolesREF> userRoleseREFs, Set<UserBookingReqDTO> userBookingReqDTOs, Set<TransComDetailsDTO> transComDetailsDTOs) {
		this.userId = userId;
		this.email = email;
		this.enabled = enabled;
		this.name = name;
		this.password = password;
		this.userName = userName;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.updatedBy = updatedBy;
		this.updatedDate = updatedDate;
		this.passwordChanged = passwordChanged;
		this.appTrackInfoDTOs = appTrackInfoDTOs;
		this.UserRolesREFs = userRoleseREFs;
		this.userBookingReqDTOs = userBookingReqDTOs;
		this.transComDetailsDTOs = transComDetailsDTOs;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "USER_ID", unique = true, nullable = false)
	public long getUserId() {
		return this.userId;
	}

	public void setUserId(long userId) {
		this.userId = userId;
	}

	@Column(name = "EMAIL", unique = true, nullable = false, length = 50)
	public String getEmail() {
		return this.email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	@Column(name = "ENABLED")
	public Boolean getEnabled() {
		return this.enabled;
	}

	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	@Column(name = "NAME", nullable = false)
	public String getName() {
		return this.name;
	}

	public void setName(String name) {
		this.name = name;
	}

	@Column(name = "PASSWORD", nullable = false)
	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	@Column(name = "USER_NAME", nullable = false, length = 45)
	public String getUserName() {
		return this.userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	@Column(name = "CREATED_BY", length = 45)
	public String getCreatedBy() {
		return this.createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "CREATED_DATE", length = 19)
	public Date getCreatedDate() {
		return this.createdDate;
	}

	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}

	@Column(name = "UPDATED_BY", length = 45)
	public String getUpdatedBy() {
		return this.updatedBy;
	}

	public void setUpdatedBy(String updatedBy) {
		this.updatedBy = updatedBy;
	}

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "UPDATED_DATE", length = 19)
	public Date getUpdatedDate() {
		return this.updatedDate;
	}

	public void setUpdatedDate(Date updatedDate) {
		this.updatedDate = updatedDate;
	}

	@Column(name = "PASSWORD_CHANGED")
	public Boolean isPasswordChanged() {
		return this.passwordChanged;
	}

	public void setPasswordChanged(Boolean passwordChanged) {
		this.passwordChanged = passwordChanged;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "userDTO", cascade = CascadeType.ALL, orphanRemoval = true)
	public Set<AppTrackInfoDTO> getAppTrackInfoDTOs() {
		return this.appTrackInfoDTOs;
	}

	public void setAppTrackInfoDTOs(Set<AppTrackInfoDTO> appTrackInfoDTOs) {
		this.appTrackInfoDTOs = appTrackInfoDTOs;
	}

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "userDTO", cascade = CascadeType.ALL, orphanRemoval = true)
	public Set<UserRolesREF> getUserRolesREFs() {
		return this.UserRolesREFs;
	}

	public void setUserRolesREFs(Set<UserRolesREF> UserRolesREFs) {
		this.UserRolesREFs = UserRolesREFs;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
	public Set<UserBookingReqDTO> getUserBookingReqDTOs() {
		return this.userBookingReqDTOs;
	}

	public void setUserBookingReqDTOs(Set<UserBookingReqDTO> userBookingReqDTOs) {
		this.userBookingReqDTOs = userBookingReqDTOs;
	}

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
	public Set<TransComDetailsDTO> getTransComDetailsDTOs() {
		return this.transComDetailsDTOs;
	}

	public void setTransComDetailsDTOs(Set<TransComDetailsDTO> transComDetailsDTOs) {
		this.transComDetailsDTOs = transComDetailsDTOs;
	}

	@Override
	public String toString() {
		return "UserDTO [userId=" + userId + ", email=" + email + ", enabled=" + enabled + ", name=" + name
				+ ", password=" + password + ", userName=" + userName + ", createdBy=" + createdBy + ", createdDate="
				+ createdDate + ", updatedBy=" + updatedBy + ", updatedDate=" + updatedDate + ", passwordChanged="
				+ passwordChanged + ", appTrackInfoDTOs=" + appTrackInfoDTOs + ", UserRolesREFs=" + UserRolesREFs
				+ ", userBookingReqDTOs=" + userBookingReqDTOs + ", transComDetailsDTOs=" + transComDetailsDTOs + "]";
	}

	
	
	
	
}

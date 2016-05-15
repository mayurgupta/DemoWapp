package com.trucktrans.entity.dto;

// Generated 12 Oct, 2015 11:47:03 PM by Hibernate Tools 3.4.0.CR1

import static javax.persistence.GenerationType.IDENTITY;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.codehaus.jackson.annotate.JsonManagedReference;

/**
 * TtUserRole generated by hbm2java
 */
@Entity
@Table(name = "tt_user_role", catalog = "trucksys")
public class UserRoleDTO implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private Long roleId;
	private String authority;
	private String roleDescription;
	private Set<UserRolesREF> userRolesRefDTOs = new HashSet<UserRolesREF>(0);

	public UserRoleDTO() {
	}

	public UserRoleDTO(Long roleId) {
		this.roleId = roleId;
	}

	public UserRoleDTO(Long roleId, String authority, String roleDescription, Set<UserRolesREF> userRolesRefDTOs) {
		this.roleId = roleId;
		this.authority = authority;
		this.roleDescription = roleDescription;
		this.userRolesRefDTOs = userRolesRefDTOs;
	}

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "ROLE_ID", unique = true, nullable = false)
	public Long getRoleId() {
		return this.roleId;
	}

	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}

	@Column(name = "AUTHORITY", length = 45)
	public String getAuthority() {
		return this.authority;
	}

	public void setAuthority(String authority) {
		this.authority = authority;
	}

	@Column(name = "ROLE_DESCRIPTION", length = 45)
	public String getRoleDescription() {
		return this.roleDescription;
	}

	public void setRoleDescription(String roleDescription) {
		this.roleDescription = roleDescription;
	}

	@OneToMany(fetch = FetchType.EAGER, mappedBy = "userRoleDTO")
	@JsonManagedReference
	public Set<UserRolesREF> getUserRolesRefDTOs() {
		return this.userRolesRefDTOs;
	}

	public void setUserRolesRefDTOs(Set<UserRolesREF> userRolesRefDTOs) {
		this.userRolesRefDTOs = userRolesRefDTOs;
	}

}

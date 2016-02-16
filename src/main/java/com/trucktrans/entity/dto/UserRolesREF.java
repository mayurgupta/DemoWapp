package com.trucktrans.entity.dto;

// Generated 12 Oct, 2015 11:47:03 PM by Hibernate Tools 3.4.0.CR1

import javax.persistence.AttributeOverride;
import javax.persistence.AttributeOverrides;
import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * TtCrossRefUserRoles generated by hbm2java
 */
@Entity
@Table(name = "tt_cross_ref_user_roles", catalog = "trucksys")
public class UserRolesREF implements java.io.Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private UserRolesId id;
	private UserRoleDTO userRoleDTO;
	private UserDTO userDTO;

	public UserRolesREF() {
	}

	public UserRolesREF(UserRolesId id, UserRoleDTO userRoleDTO, UserDTO userDTO) {
		this.id = id;
		this.userRoleDTO = userRoleDTO;
		this.userDTO = userDTO;
	}

	@EmbeddedId
	@AttributeOverrides({ @AttributeOverride(name = "roleId", column = @Column(name = "ROLE_ID", nullable = false)),
			@AttributeOverride(name = "userId", column = @Column(name = "USER_ID", nullable = false)) })
	public UserRolesId getId() {
		return this.id;
	}

	public void setId(UserRolesId id) {
		this.id = id;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "ROLE_ID", nullable = false, insertable = false, updatable = false)
	public UserRoleDTO getUserRoleDTO() {
		return this.userRoleDTO;
	}

	public void setUserRoleDTO(UserRoleDTO userRoleDTO) {
		this.userRoleDTO = userRoleDTO;
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "USER_ID", nullable = false, insertable = false, updatable = false)
	public UserDTO getUserDTO() {
		return this.userDTO;
	}

	public void setUserDTO(UserDTO userDTO) {
		this.userDTO = userDTO;
	}

	@Override
	public String toString() {
		return "UserRolesREF [id=" + id + ", userRoleDTO=" + userRoleDTO + ", userDTO=" + userDTO + "]";
	}

	
	
}

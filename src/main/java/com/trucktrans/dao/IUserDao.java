/**
 * 
 */
package com.trucktrans.dao;

import java.util.Date;

import com.trucktrans.entity.dto.UserDTO;

/**
 * @author Mayur
 * 10:55:13 pm, 07-Oct-2015
 *
 */
public interface IUserDao extends IEntityDao<UserDTO, Long> {

    /**
     * return user by given username
     * 
     * @param username
     */
    UserDTO getByUserName(String username);

    /**
     * 
     * @param email
     */
    UserDTO getByEmail(String email);

    /**
     * deactivates the user if active
     * 
     * @param userDTO
     */

    void deactivate(UserDTO userDTO);

    /**
     * activates user, does nothing if user already active
     * 
     * @param userDTO
     */
    void activate(UserDTO userDTO);
    
    
    public static class ProfileQueryBuilder{
    	private long userId;
    	private String email;
    	private Boolean enabled;
    	private String name;
    	private String password;
    	private String confPassword;
		private String userName;
    	private String createdBy;
    	private Date createdDate;
    	private String updatedBy;
    	private Date updatedDate;
    	private Boolean passwordChanged;
    	private Long companyId;
    	
    	public String getConfPassword() {
			return confPassword;
		}
		public void setConfPassword(String confPassword) {
			this.confPassword = confPassword;
		}
    	
		public long getUserId() {
			return userId;
		}
		public void setUserId(long userId) {
			this.userId = userId;
		}
		public String getEmail() {
			return email;
		}
		public void setEmail(String email) {
			this.email = email;
		}
		public Boolean getEnabled() {
			return enabled;
		}
		public void setEnabled(Boolean enabled) {
			this.enabled = enabled;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getPassword() {
			return password;
		}
		public void setPassword(String password) {
			this.password = password;
		}
		public String getUserName() {
			return userName;
		}
		public void setUserName(String userName) {
			this.userName = userName;
		}
		public String getCreatedBy() {
			return createdBy;
		}
		public void setCreatedBy(String createdBy) {
			this.createdBy = createdBy;
		}
		public Date getCreatedDate() {
			return createdDate;
		}
		public void setCreatedDate(Date createdDate) {
			this.createdDate = createdDate;
		}
		public String getUpdatedBy() {
			return updatedBy;
		}
		public void setUpdatedBy(String updatedBy) {
			this.updatedBy = updatedBy;
		}
		public Date getUpdatedDate() {
			return updatedDate;
		}
		public void setUpdatedDate(Date updatedDate) {
			this.updatedDate = updatedDate;
		}
		public Boolean getPasswordChanged() {
			return passwordChanged;
		}
		public void setPasswordChanged(Boolean passwordChanged) {
			this.passwordChanged = passwordChanged;
		}
		public Long getCompanyId() {
			return companyId;
		}
		public void setCompanyId(Long companyId) {
			this.companyId = companyId;
		}
		
    }
    
    
    

}

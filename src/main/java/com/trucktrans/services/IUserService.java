/**
 * 
 */
package com.trucktrans.services;

import java.util.List;
import java.util.Map;

import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.web.WPassword;
import com.trucktrans.entity.web.WStatus;
import com.trucktrans.entity.web.WUser;
import com.trucktrans.entity.web.WUserDetails;

/**
 * @author Mayur
 * 4:57:53 pm, 20-Sep-2015
 *
 */
public interface IUserService {

	/**
	 * access user by login id name
	 * 
	 * @param userName
	 * @return
	 */
	WUserDetails getUserByUserName(String userName);

	/**
	 * 
	 * @param user
	 */
	void update(WUser user);

	/**
	 * 
	 * @param userName
	 */
	void delete(String userName);

	/**
	 * /** returns Map key-> "userDetails" entry->WUserDetails <br>
	 * key->"clusters" entry -> List<WEntity> contains Id and Name of cluster <br>
	 * key->"hospitals" entry -> List<WEntity> contains Id and Name of hospitals
	 * 
	 * @param userName
	 * @return
	 */
	Map<String, Object> getAppInitiationData(UserDTO user,boolean includeCompetitor);


	/**
	 * Adds a new User using the details within WUser object
	 * 
	 * @param wUser
	 * @return id of the new user and null if the adding failed
	 */
	Long addUser(WUser wUser);

	/**
	 * deactivates user with user-name as username
	 */
	void deactivate(String username);

	/**
	 * activates user with user-name as username
	 */
	void activate(String username);

	/**
	 * Adds role having role id in roleIds to user with user name as userName
	 * 
	 * @param username
	 * @param roleIds
	 */
	void addRole(String username, List<Long> roleIds);

	/**
	 * removes role from user having username as 'username'<br>
	 * silently completes the method if role asked to remove was not present
	 * 
	 * @param username
	 * @param roleIds
	 */
	void removeRole(String username, List<Long> roleIds);

	/**
	 * 
	 * @param userDTO
	 * @param hospitalIds
	 * @return
	 */

	
	WStatus changePassword(UserDTO user,WPassword wPassword);
	
	WStatus forgotPassword(WPassword wPassword);

	Boolean validateUser(String username, List<Long> hospitalIds);
}
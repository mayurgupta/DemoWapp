/**
 * 
 */
package com.trucktrans.helpers;

import com.trucktrans.dao.IUserDao.ProfileQueryBuilder;
import com.trucktrans.entity.web.WUserProfile;

/**
 * @author mgupta
 *
 */
public class ProfileBeanHelper {

	/**
	 * @param args
	 */
	
	
	
	public static void main(WUserProfile user) {
		ProfileQueryBuilder profileQueryBuilder=new ProfileQueryBuilder();
		if (user.getName() != null) {
			profileQueryBuilder.setName(user.getName());
		} 
		if (user.getUserName() != null) {
			profileQueryBuilder.setUserName(user.getUserName());
		}		
		if (user.getPassword() != null) {
			profileQueryBuilder.setPassword(user.getPassword());
			profileQueryBuilder.setConfPassword(user.getPassword1());
		}
		if (user.get) {
			
		}
	}

}

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
	
	
	
	public static void main(WUserProfile userProfile) {
		ProfileQueryBuilder profileQueryBuilder=new ProfileQueryBuilder();
		if (userProfile.getName() != null) {
			profileQueryBuilder.setName(userProfile.getName());
		} 
		if (userProfile.getUserName() != null) {
			profileQueryBuilder.setUserName(userProfile.getUserName());
		}		
		if (userProfile.getPassword() != null) {
			profileQueryBuilder.setPassword(userProfile.getPassword());
			profileQueryBuilder.setConfPassword(userProfile.getPassword1());
		}
		if (userProfile.getCompanyDesc()!= null) {
			profileQueryBuilder.setCompanyDesc(userProfile.getCompanyDesc());
		}
	}

}

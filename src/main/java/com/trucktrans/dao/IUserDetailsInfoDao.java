/**
 * 
 */
package com.trucktrans.dao;

import java.io.Serializable;

import com.trucktrans.entity.dto.UserDetailsInfoDTO;
import com.trucktrans.entity.web.WUserDetails;

/**
 * @author Mayur 
 * Time:6:14:06 pm,  09-May-2016
 * 
 */
public interface IUserDetailsInfoDao extends IEntityDao<UserDetailsInfoDTO, Serializable>{

	void editProfile(WUserDetails wuser);
	
	

}

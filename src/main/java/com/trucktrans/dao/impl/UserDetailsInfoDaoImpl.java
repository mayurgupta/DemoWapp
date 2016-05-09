/**
 * 
 */
package com.trucktrans.dao.impl;

import java.io.Serializable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.trucktrans.dao.IUserDao;
import com.trucktrans.dao.IUserDetailsInfoDao;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.dto.UserDetailsInfoDTO;
import com.trucktrans.entity.web.WUserDetails;

/**
 * @author Mayur 
 * Time:6:15:33 pm,  09-May-2016
 * 
 */
@Repository
public class UserDetailsInfoDaoImpl extends AbstractHibernateDaoImpl<UserDetailsInfoDTO, Serializable> implements IUserDetailsInfoDao{

	@Autowired
	IUserDao userDao;
	
	@Override
	public void editProfile(WUserDetails wuser) {
		UserDTO userdto=userDao.getByEmail(wuser.getEmail());
		UserDetailsInfoDTO userDetailsInfo=new UserDetailsInfoDTO();
		
		if (wuser.getCity() != null) {
			userDetailsInfo.setCity(wuser.getCity());
		}
		if (wuser.getLandMark() != null) {
			userDetailsInfo.setLandMark(wuser.getLandMark());			
		}
		if (wuser.getLandMark() != null) {
			userDetailsInfo.setLandMark(wuser.getLandMark());			
		}
		if (wuser.getPincode() != null) {
			userDetailsInfo.setPincode(wuser.getPincode());	
		}
		if (wuser.getPrimaryPhone() != null) {
			userDetailsInfo.setPrimaryPhone(wuser.getPrimaryPhone());	
		}
		if (wuser.getSecondaryPhone() != null) {
			userDetailsInfo.setSecondaryPhone(wuser.getSecondaryPhone());
		}
		if (wuser.getState() != null) {
			userDetailsInfo.setState(wuser.getState());	
		}
		userDetailsInfo.setUser(userdto);
		save(userDetailsInfo);
		
	}
	
	
}

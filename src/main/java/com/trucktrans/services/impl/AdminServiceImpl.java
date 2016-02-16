/**
 * 
 */
package com.trucktrans.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trucktrans.dao.IAdminDao;
import com.trucktrans.services.IAdminService;

/**
 * @author Mayur
 * 8:58:23 pm, 10-Dec-2015
 *
 */
@Service
@Transactional(readOnly = true)
public class AdminServiceImpl implements IAdminService{

	@Autowired
	IAdminDao adminDao;
	
	@Override
	public Object getUserData() {
		
		return adminDao.getDBUsersData();
	}

}

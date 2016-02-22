/**
 * 
 */
package com.trucktrans.services.impl;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trucktrans.dao.IStateInfoDao;
import com.trucktrans.dao.IUserBookingReqDao;
import com.trucktrans.dao.IUserDao;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.services.IFilterServices;
import com.trucktrans.web.WFilterResponse;

;



/**
 * @author Mayur
 * 11:47:40 pm, 14-Oct-2015
 *
 */
@Service
@Transactional(readOnly = true)
public class FilterServiceImpl implements IFilterServices{

	
	@Autowired
	IUserBookingReqDao userBookingReqDao;
	@Autowired
	IStateInfoDao stateInfoDao;
	
	@Override
	public Map<String, List<WFilterResponse>> getFilters() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Map<String, Object> getAppInitialFilters(UserDTO user, boolean includeCompetitor) {
		Map<String, Object> userDataMap=new LinkedHashMap<String, Object>();
		userDataMap.put("userBookingHistory", userBookingReqDao.getBookingHistory(user));
		userDataMap.put("stateList", stateInfoDao.getAllStates());
		return userDataMap;
	}
	
	
	
	
}

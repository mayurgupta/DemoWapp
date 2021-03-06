/**
 * 
 */
package com.trucktrans.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trucktrans.dao.IUserBookingReqDao;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.web.WUserBooking;
import com.trucktrans.services.IDashBoardService;

/**
 * @author Mayur
 * 10:44:45 pm, 29-Oct-2015
 *
 */

@Service
@Transactional(readOnly = true)
public class DashboardServiceImpl implements IDashBoardService{

	@Autowired
	IUserBookingReqDao userBookingDao;
	
	@Override
	public Object planTransportation(WUserBooking userBooking, UserDTO userDTO) {
		userBookingDao.planTransportation(userBooking,userDTO);
		return null;
	}

}

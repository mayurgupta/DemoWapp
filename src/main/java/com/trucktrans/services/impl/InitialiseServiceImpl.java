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
import com.trucktrans.services.IInitialiseService;

/**
 * @author Mayur
 *
 */

@Service
@Transactional(readOnly = true)
public class InitialiseServiceImpl implements IInitialiseService{

	@Autowired
	IUserBookingReqDao userBookingDao;
	
	@Override
	public Object planGuestTransportation(WUserBooking userBooking, UserDTO userDTO) {
		userBookingDao.planTransportation(userBooking,userDTO);
		return null;
	}
	
}

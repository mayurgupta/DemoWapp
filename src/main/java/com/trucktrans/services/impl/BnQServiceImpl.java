/**
 * 
 */
package com.trucktrans.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trucktrans.dao.IUserBookingReqDao;
import com.trucktrans.services.IBnQService;

/**
 * @author mgupta
 *
 */
@Service
@Transactional(readOnly = true)
public class BnQServiceImpl implements IBnQService{
	@Autowired
	IUserBookingReqDao userBookingReqDao;
	
	
	@Override
	public Object searchBookings(String source, String destination,
			long datefrom, long dateto,int offset) {
		return userBookingReqDao.getSearchResults(source, destination, datefrom, dateto, offset);
		
	}


	@Override
	public Object getBookings(int offset) {
		return userBookingReqDao.getAllBookings(offset);
	}

}

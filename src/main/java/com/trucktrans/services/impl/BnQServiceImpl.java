/**
 * 
 */
package com.trucktrans.services.impl;

import org.springframework.beans.factory.annotation.Autowired;

import com.trucktrans.dao.IUserBookingReqDao;
import com.trucktrans.services.IBnQService;

/**
 * @author mgupta
 *
 */
public class BnQServiceImpl implements IBnQService{
	@Autowired
	IUserBookingReqDao userBookingReqDao;
	
	
	@Override
	public Object searchBookings(String source, String destination,
			long datefrom, long dateto) {
		return userBookingReqDao.getSearchResults(source, destination, datefrom, dateto);
		
	}

}

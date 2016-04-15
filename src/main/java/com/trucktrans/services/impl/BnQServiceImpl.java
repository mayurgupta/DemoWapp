/**
 * 
 */
package com.trucktrans.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trucktrans.dao.ITransComQuotesDao;
import com.trucktrans.dao.IUserBookingReqDao;
import com.trucktrans.entity.dto.UserDTO;
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
	
	@Autowired
	ITransComQuotesDao iTransComQuotesDao;
	
	@Override
	public Object searchBookings(String source, String destination,
			long datefrom, long dateto,int offset) {
		return userBookingReqDao.getSearchResults(source, destination, datefrom, dateto, offset);
		
	}


	@Override
	public Object getBookings(int offset) {
		return userBookingReqDao.getAllBookings(offset);
	}


	@Override
	public Object putQuote(Long postId, int price, String remark, String carrierType, Long mindays, Long maxdays, UserDTO userDTO) {
		return iTransComQuotesDao.putMyQuoteforPost(postId, price, remark, carrierType, mindays, maxdays, userDTO);
	}


	/* (non-Javadoc)
	 * @see com.trucktrans.services.IBnQService#getAllQuotesForPost(java.lang.Long)
	 * 
	 * This is for user who is viewing all the quotes
	 * for his post
	 */
	@Override
	public Object getAllQuotesForPost(Long postId) {
		return iTransComQuotesDao.getAllQuotesForPost(postId);
	}

	@Override
	public Object getAllQuotesForTransporter(Long transporterId) {
		return iTransComQuotesDao.getAllQuotesForTransporter(transporterId);
	}
	
	
}

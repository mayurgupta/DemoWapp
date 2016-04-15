/**
 * 
 */
package com.trucktrans.dao.impl;

import java.util.List;

import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.trucktrans.dao.ITransComQuotesDao;
import com.trucktrans.dao.IUserBookingReqDao;
import com.trucktrans.entity.dto.TransComQuotesDTO;
import com.trucktrans.entity.dto.UserBookingReqDTO;
import com.trucktrans.entity.dto.UserDTO;

/**
 * @author mgupta
 *
 */

@Repository
public class TransComQuotesDaoImpl extends AbstractHibernateDaoImpl<TransComQuotesDTO, Long> implements ITransComQuotesDao{

	
	@Autowired
	IUserBookingReqDao userBookingReqDao;
	
	/**
	 * @param bookingId
	 * @return
	 * 
	 * Retrieve all quotes post by a transporter 
	 * for any posts to be desplayed in user history
	 */
	@Override
	public List<TransComQuotesDTO> getAllQuotesForPost(Long userId){
		return (List<TransComQuotesDTO>)getSessionFactory().getCurrentSession().createCriteria(TransComQuotesDTO.class)
		.add(Restrictions.eq("userBookingReqDTO.bookingId", userId)).list();
	}
	
	@Override
	public List<TransComQuotesDTO> getAllQuotesByPostId(Long postId){
		return (List<TransComQuotesDTO>)getSessionFactory().getCurrentSession().createCriteria(TransComQuotesDTO.class)
		.add(Restrictions.eq("userBookingReqDTO.bookingId", postId)).list();
	}
	
	
	@Override
	public List<TransComQuotesDTO> putMyQuoteforPost(Long postId, int price, String remark, String carrierType, Long mindays, Long maxdays,UserDTO UserDTO) {
		UserBookingReqDTO bookingReqDTO=userBookingReqDao.getById(postId);
		TransComQuotesDTO transComQuotesDTO = new TransComQuotesDTO();
		transComQuotesDTO.setMaxTime(maxdays);
		transComQuotesDTO.setMinTime(mindays);
		transComQuotesDTO.setPriceEstimates(price);
		transComQuotesDTO.setRemarks(remark);
		transComQuotesDTO.setTruckType(carrierType);
		transComQuotesDTO.setUserBookingReqDTO(bookingReqDTO);
		save(transComQuotesDTO);
		return null;
	}

	@Override
	public Object getAllQuotesForTransporter(Long transporterId) {
		return (List<TransComQuotesDTO>)getSessionFactory().getCurrentSession().createCriteria(TransComQuotesDTO.class)
				.add(Restrictions.eq("userBookingReqDTO.bookingId", transporterId)).list();
	}
	
}

/**
 * 
 */
package com.trucktrans.dao.impl;

import java.util.Iterator;
import java.util.List;

import javax.ws.rs.core.Response;

import org.hibernate.Criteria;
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

	@Override
	public Object toggleAccDeclQuote(Long quoteId, Boolean accDeclFlag, Long postId) {
		TransComQuotesDTO transComQuotesDTO=getById(quoteId);
		Criteria criteria = getSessionFactory().getCurrentSession().createCriteria(TransComQuotesDTO.class);
		criteria.add(Restrictions.eq("userBookingReqDTO.bookingId", postId));
		List<TransComQuotesDTO> tcQuotesList=criteria.list();
		for (TransComQuotesDTO tCQuotesDTO : tcQuotesList) {
			if (tCQuotesDTO.getAcceptDeclineFlag()==true) {
				return "already exist";
			}
		}
		transComQuotesDTO.setAcceptDeclineFlag(accDeclFlag);
		
		return save(transComQuotesDTO);
	}

	@Override
	public Object toggleReadUnreadQuote(Long quoteId, Boolean ruFlag) {
		TransComQuotesDTO transComQuotesDTO=getById(quoteId);
		transComQuotesDTO.setAcceptDeclineFlag(ruFlag);
		
		return save(transComQuotesDTO);
	}
	
}

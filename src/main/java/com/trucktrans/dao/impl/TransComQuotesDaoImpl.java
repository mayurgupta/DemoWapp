/**
 * 
 */
package com.trucktrans.dao.impl;

import java.util.List;

import org.hibernate.criterion.Restrictions;

import com.trucktrans.dao.ITransComQuotesDao;
import com.trucktrans.entity.dto.TransComQuotesDTO;

/**
 * @author mgupta
 *
 */
public class TransComQuotesDaoImpl extends AbstractHibernateDaoImpl<TransComQuotesDTO, Long> implements ITransComQuotesDao{

	@Override
	public List<TransComQuotesDTO> getAllBookingId(Long bookingId){
		return (List<TransComQuotesDTO>)getSessionFactory().getCurrentSession().createCriteria(TransComQuotesDTO.class)
		.add(Restrictions.eq("userBookingReqDTO.bookingId", bookingId)).list();
	}
}

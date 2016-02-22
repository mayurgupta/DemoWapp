/**
 * 
 */
package com.trucktrans.dao;

import java.util.List;

import com.trucktrans.entity.dto.TransComQuotesDTO;

/**
 * @author mgupta
 *
 */
public interface ITransComQuotesDao extends IEntityDao<TransComQuotesDTO, Long>{

	List<TransComQuotesDTO> getAllBookingId(Long bookingId);

	
	
}

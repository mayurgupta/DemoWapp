/**
 * 
 */
package com.trucktrans.dao;

import java.util.List;

import com.trucktrans.entity.dto.TransComQuotesDTO;
import com.trucktrans.entity.dto.UserDTO;

/**
 * @author mgupta
 *
 */
public interface ITransComQuotesDao extends IEntityDao<TransComQuotesDTO, Long>{

	List<TransComQuotesDTO> getAllQuotesForPost(Long bookingId);

//	List<TransComQuotesDTO> createQuote(Long bookingId);

	List<TransComQuotesDTO> putMyQuoteforPost(Long postId, int price, String remark, String carrierType, Long mindays, Long maxdays, UserDTO userDTO);

	List<TransComQuotesDTO> getAllQuotesByPostId(Long postId);

	Object getAllQuotesForTransporter(Long transporterId);

	Object toggleAccDeclQuote(Long quoteId, Boolean accDeclFlag, Long postId);

	Object toggleReadUnreadQuote(Long quoteId, Boolean ruFlag);

	TransComQuotesDTO generateInvoice(Long quoteId);

	Object getCategorisedQuotes(Long userId);

	
	
}

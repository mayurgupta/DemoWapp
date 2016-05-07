/**
 * 
 */
package com.trucktrans.services;

import java.util.Date;

import com.trucktrans.entity.dto.UserDTO;


/**
 * @author mgupta
 *
 */
public interface IBnQService {

	Object searchBookings(String source, String destination, Date datefrom,
			Date dateto, int offset);

	Object getBookings(int offset);

	Object putQuote(Long postId, int price, String remark, String carrierType, Long mindays, Long maxdays, UserDTO userDTO);

	Object getAllQuotesForPost(Long postId);

	Object getAllQuotesForTransporter(Long transporterId);

	Object toggleAccDeclQuote(Long quoteId, Boolean accDeclFlag, Long postId);

	Object toggleReadUnreadQuote(Long quoteId, Boolean ruFlag);

}

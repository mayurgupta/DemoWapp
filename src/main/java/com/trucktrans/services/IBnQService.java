/**
 * 
 */
package com.trucktrans.services;


/**
 * @author mgupta
 *
 */
public interface IBnQService {

	Object searchBookings(String source, String destination, long datefrom,
			long dateto, int offset);

	Object getBookings(int offset);

	Object putQuote(Long postId, int price, String remark, String carrierType, Long mindays, Long maxdays);

	Object getAllQuotesForPost(Long postId);

	Object getAllQuotesForTransporter(Long transporterId);

}

/**
 * 
 */
package com.trucktrans.services;

import com.trucktrans.entity.dto.TransComQuotesDTO;

/**
 * @author Mayur 
 * Time:11:42:39 pm,  27-Apr-2016
 * 
 */
public interface IHistoryService {

	TransComQuotesDTO generateInvoice(Long quoteId);

}

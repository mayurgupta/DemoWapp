/**
 * 
 */
package com.trucktrans.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trucktrans.dao.ITransComQuotesDao;
import com.trucktrans.entity.dto.TransComQuotesDTO;
import com.trucktrans.services.IHistoryService;

/**
 * @author Mayur 
 * Time:11:44:30 pm,  27-Apr-2016
 * 
 */

@Service
@Transactional(readOnly = true) 
public class HistoryServiceImpl implements IHistoryService{

	@Autowired
	ITransComQuotesDao transComQuotes;
	
	@Override
	public TransComQuotesDTO generateInvoice(Long quoteId) {
		return transComQuotes.getById(quoteId);
//		return null;
	}
	

}

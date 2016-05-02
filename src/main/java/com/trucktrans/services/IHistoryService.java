/**
 * 
 */
package com.trucktrans.services;

import java.io.OutputStream;

import javax.servlet.ServletContext;
import javax.ws.rs.core.UriInfo;

import com.trucktrans.entity.dto.TransComQuotesDTO;

/**
 * @author Mayur 
 * Time:11:42:39 pm,  27-Apr-2016
 * 
 */
public interface IHistoryService {

	TransComQuotesDTO generateInvoice(Long quoteId, UriInfo paramUriInfo, ServletContext context, OutputStream paramAnonymousOutputStream);

}

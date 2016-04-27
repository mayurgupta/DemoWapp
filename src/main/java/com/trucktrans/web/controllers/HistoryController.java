/**
 * 
 */
package com.trucktrans.web.controllers;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.trucktrans.entity.dto.TransComQuotesDTO;
import com.trucktrans.services.IHistoryService;

/**
 * @author mgupta
 *
 */
@Component
@Scope("request")
@Path("/history")
public class HistoryController extends AbstractRestController<TransComQuotesDTO>{

	public IHistoryService getHistoryService() {
		return historyService;
	}

	@Autowired
	IHistoryService historyService;
	
	public HistoryController() {
		super(TransComQuotesDTO.class);
	}
	
	@GET
    @Path("/acceptedquotes")					   //
    @Produces({ MediaType.APPLICATION_JSON })	   //
	public Response myAccptQuotes(){			   //	
		return Response.ok().build();			   //
	}											   //
	                                               //
	                                               //we can combine these two methods into one method
	@GET                                           //
    @Path("/declinedquotes")                       //
    @Produces({ MediaType.APPLICATION_JSON })      //
	public Response myDeclndQuotes(){              //Load these methods when history page opens
		return Response.ok().build();              //
	}                                              //
	                                                            
	@GET                                                        
    @Path("/orderfrmquote/{quoteid}")
    @Produces({ MediaType.APPLICATION_JSON })
	//this is for transporter
	public Response orderFrmQuote(){
		//TODO write code for both accepted code and declined code 
		return Response.ok().build();
	}
	
	@GET
    @Path("/invoice/{quoteid}")
    @Produces({ MediaType.APPLICATION_JSON })
	public Response downloadInvoice(@PathParam("quoteid") Long quoteId){
		return Response.ok(getHistoryService().generateInvoice(quoteId)).build();
	}
	
}

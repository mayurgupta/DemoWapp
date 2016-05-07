/**
 * 
 */
package com.trucktrans.web.controllers;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletContext;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.StreamingOutput;
import javax.ws.rs.core.UriInfo;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.trucktrans.entity.dto.TransComQuotesDTO;
import com.trucktrans.services.IHistoryService;
import com.trucktrans.services.impl.LogService;

/**
 * @author mgupta
 *
 */
@Component
@Scope("request")
@Path("/history")
public class HistoryController extends AbstractRestController<TransComQuotesDTO>{
	
	private static final Logger LOGGER = Logger.getLogger(LogService.class);

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
	public Response myAccptQuotes(@QueryParam("userId") Long userId){			   //	
		return Response.ok().build();			   //  we can combine these two methods into one method  
	}											   //                                                    
	                                               //                                                    
	                                               //                                                    
	@GET                                           //  Load these methods when history page opens        
    @Path("/declinedquotes")                       //
    @Produces({ MediaType.APPLICATION_JSON })      //
	public Response myDeclndQuotes(){              //
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
	public Response downloadInvoice(@PathParam("quoteid") Long quoteId,
			@Context final UriInfo paramUriInfo,
			@Context final ServletContext context){

		
		
		StreamingOutput local2 = new StreamingOutput() {

			@Override
			public void write(OutputStream paramAnonymousOutputStream) throws IOException, WebApplicationException {
				try {
					getHistoryService().generateInvoice(quoteId, paramUriInfo, context, paramAnonymousOutputStream);
				} catch (Exception e) {
					LOGGER.error("unable to generate pdf", e);
				}
			}
		};
		
		return null;
		//		return Response.ok(getHistoryService().generateInvoice(quoteId,paramUriInfo,context,paramAnonymousOutputStream)).build();
	}	
}

/**
 * 
 */
package com.trucktrans.web.controllers;

import java.io.IOException;
import java.io.OutputStream;

import javax.servlet.ServletContext;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
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
    @Path("/myquotes")					   
    @Produces({ MediaType.APPLICATION_JSON })
	public Response myAccptQuotes(@QueryParam("userId") Long userId){			   
		return Response.ok(getHistoryService().getQuotes(userId)).build();		
	}											  
	                                              
	@GET                                                        
    @Path("/orderfrmquote/{quoteid}")
    @Produces({ MediaType.APPLICATION_JSON })
	//this is for transporter
	public Response orderFrmQuote(){
		//TODO write code for both accepted code and declined code 
		return Response.ok().build();
	}
	
	@POST
    @Path("/invoice/{quoteid}")
//    @Produces({ MediaType.APPLICATION_JSON })
	@Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Produces({ "application/pdf" })
	public Response downloadInvoice(@PathParam("quoteid") Long quoteId,
			@Context final UriInfo paramUriInfo,
			@Context final ServletContext context){

		System.out.println("inside print pdf method");
		
		StreamingOutput local2 = new StreamingOutput() {
			
			
			@Override
			public void write(OutputStream paramAnonymousOutputStream) throws IOException, WebApplicationException {
				try {
					System.out.println("inside annonymus");
					getHistoryService().generateInvoice(quoteId, paramUriInfo, context, paramAnonymousOutputStream);
				} catch (Exception e) {
					LOGGER.error("unable to generate pdf", e);
				}
			}
		};
		
		return Response
                .ok(local2)
                .header("content-disposition",
                        "attachment; filename =" + "myname").build();
		//		return Response.ok(getHistoryService().generateInvoice(quoteId,paramUriInfo,context,paramAnonymousOutputStream)).build();
	}
}

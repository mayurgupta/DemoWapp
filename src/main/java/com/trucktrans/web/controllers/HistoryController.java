/**
 * 
 */
package com.trucktrans.web.controllers;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * @author mgupta
 *
 */
@Component
@Scope("request")
@Path("/history")
public class HistoryController extends AbstractRestController<Object>{

	public HistoryController(Class<Object> t) {
		super(t);
	}
	
	public HistoryController() {
		super(Object.class);
	}
	
	@GET
    @Path("/acceptedquotes")
    @Produces({ MediaType.APPLICATION_JSON })
	public Response myAccptQuotes(){
		return Response.ok().build();
	}
	
	
	@GET
    @Path("/declinedquotes")
    @Produces({ MediaType.APPLICATION_JSON })
	public Response myDeclndQuotes(){
		return Response.ok().build();
	}
	
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
	public Response downldInvoice(){
		//TODO write code to generate PDF
		return Response.ok().build();
	}
	
}

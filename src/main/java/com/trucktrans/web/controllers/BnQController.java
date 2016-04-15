/**
 * 
 */
package com.trucktrans.web.controllers;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.trucktrans.entity.web.WUser;
import com.trucktrans.services.IBnQService;

/**
 * @author mgupta
 *
 */
@Component
@Scope("request")
@Path("/bookingnquotes")
public class BnQController extends AbstractRestController<Object>{

	@Autowired
	IBnQService bnQService;
	

	public BnQController() {
		super(Object.class);
	}

	
	public BnQController(Class<Object> t) {
		super(t);
	}

	@GET
    @Path("/searchbooking")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
	public Response searchBooking(@QueryParam("source") String source,
			@QueryParam("destination") String destination,
			@QueryParam("datefrom") long datefrom,
			@QueryParam("dateto") long dateto,
			@QueryParam("offset") int offset) {
    	return Response.ok(bnQService.searchBookings(source, destination, datefrom, dateto,offset)).build();
    }
	
	@GET
	@Path("/putaqote/{postid}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	//for manufacturer role
	public Response putAQuote(@PathParam("postid") Long postId,
			@QueryParam("price") int price,
			@QueryParam("remark") String remark,
			@QueryParam("carriertype") String carrierType,
			@QueryParam("mintime") Long mindays,
			@QueryParam("maxtime") Long maxdays){
		return Response.ok(bnQService.putQuote(postId, price, remark, carrierType, mindays, maxdays)).build();
	}
	
	@GET
	@Path("/getallquotes/{postid}")
	@Produces(MediaType.APPLICATION_JSON)
	@Consumes(MediaType.APPLICATION_JSON)
	//for manufacturer role
	public Response getAllQuotes(@PathParam("postid") Long postId){
		return Response.ok(bnQService.getAllQuotesForPost(postId)).build();
	}
	
}

/**
 * 
 */
package com.trucktrans.web.controllers;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
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
@Path("/bookingandquotes")
public class BnQController extends AbstractRestController<Object>{

	@Autowired
	IBnQService bnQService;
	
	
	public BnQController(Class<Object> t) {
		super(t);
	}

	@POST
    @Path("/searchbooking")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
	public Response registerUser(@QueryParam("source") String source,
			@QueryParam("destination") String destination,
			@QueryParam("datefrom") long datefrom,
			@QueryParam("dateto") long dateto) {
    	
    	return Response.ok(bnQService.searchBookings(source, destination, datefrom, dateto)).build();
    	
    }
	
}

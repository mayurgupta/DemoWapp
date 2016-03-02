/**
 * 
 */
package com.trucktrans.web.controllers;

import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.sun.jersey.api.core.InjectParam;
import com.trucktrans.entity.web.WUserBooking;
import com.trucktrans.services.IDashBoardService;

/**
 * @author mgupta
 *
 */

@Component
@Scope("request")
@Path("/dashboards")
public class DashboardController extends AbstractRestController<Object>{

	@Autowired
	IDashBoardService dashboardService;
	
	public DashboardController() {
        super(Object.class);
    }
	
	public DashboardController(Class<Object> t) {
		super(t);
	}
	
	@GET
	@Path("/myplan")
	@Produces(MediaType.APPLICATION_JSON)
	public Response myPlan(){
		System.out.println("executed the controller");
		return Response.ok("hi my plan").build();
	}
	
	
	
	@POST
	@Path("/plantransportation")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces(MediaType.APPLICATION_JSON)
	public Response planMyTransportation(@Context UriInfo uriInfo,@InjectParam WUserBooking userBooking){
		System.out.println("executed the controller");
		System.out.println("this is URI info"+uriInfo);
		//dummt test line
		if (getUserDetails() == null) {
			return Response.ok(dashboardService.planTransportation(userBooking,null)).build();
		}else{
			return Response.ok(dashboardService.planTransportation(userBooking,getUserDetails().getUserDto())).build();
		}
	}
}

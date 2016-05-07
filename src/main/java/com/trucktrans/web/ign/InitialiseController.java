/**
 * 
 */
package com.trucktrans.web.ign;

import javax.validation.Valid;
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
import com.trucktrans.dao.IStateInfoDao;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.web.WStatus;
import com.trucktrans.entity.web.WUser;
import com.trucktrans.entity.web.WUserBooking;
import com.trucktrans.services.IInitialiseService;
import com.trucktrans.services.IUserService;
import com.trucktrans.web.controllers.AbstractRestController;

/**
 * @author Mayur
 *
 */


@Component
@Scope("request")
@Path("/basic")
public class InitialiseController extends AbstractRestController<UserDTO> {

	@Autowired
    private IUserService userService;
	@Autowired
	IStateInfoDao stateInfoDao;
	@Autowired
	IInitialiseService initialiseService;
	
	
    public InitialiseController() {
        super(UserDTO.class);
    }

    public IUserService getUserService() {
        return userService;
    }

    public void setUserService(IUserService userService) {
        this.userService = userService;
    }
	
    
    
    @POST
    @Path("/registeruser")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response registerUser(WUser wuser) {
    	
//    	return Response.ok("this is controller").build();
    	
    	return Response.ok(
    			userService.registerUser(wuser)).build();
    	
    }
    
    
    @POST
    @Path("/editprofile")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editProfile(WUser wuser) {
    	
    	System.out.println(wuser.getEmail());
    	return Response.ok("asdasd").build();
    	
    	/*return Response.ok(
    			userService.editProfile(wuser)).build();*/
    	
    }
    
    
    @POST
    @Path("/registeruser2")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response register2User(WStatus wuser) {
    	
    	return Response.ok("this is controller").build();
    	
    	/*return Response.ok(
    			userService.registerUser(wuser)).build();*/
    	
    }
    
    @GET
    @Path("/filters")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response getFilters() {
        return Response.ok(stateInfoDao.getAllStates()).build();
    }
    
    
    @POST
	@Path("/planguesttransportation")
	@Consumes({ MediaType.APPLICATION_JSON })
	@Produces(MediaType.APPLICATION_JSON)
	public Response planMyTransportation(@Context UriInfo uriInfo,@InjectParam WUserBooking userBooking){
		System.out.println("executed the controller");
		System.out.println("this is URI info"+uriInfo);
		
		if (getUserDetails() == null) {
			return Response.ok(initialiseService.planGuestTransportation(userBooking,null)).build();
		}else{
			return Response.ok(initialiseService.planGuestTransportation(userBooking,getUserDetails().getUserDto())).build();
		}
	}
    
	
}

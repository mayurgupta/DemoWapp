/**
 * 
 */
package com.trucktrans.web.controllers;

import javax.validation.Valid;
import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.security.access.annotation.Secured;
import org.springframework.stereotype.Component;

import com.sun.jersey.api.core.InjectParam;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.web.WPassword;
import com.trucktrans.entity.web.WStatus;
import com.trucktrans.entity.web.WUser;
import com.trucktrans.entity.web.WUserBooking;
import com.trucktrans.entity.web.WUserDetails;
import com.trucktrans.exceptions.services.ResourceNotFoundException;
import com.trucktrans.services.IUserService;

/**
 * @author Mayur
 * 10:39:52 pm, 18-Oct-2015
 *
 */

@Component
@Scope("request")
@Path("/users")
public class UserController extends AbstractRestController<UserDTO> {

    @Autowired
    private IUserService userService;

    public UserController() {
        super(UserDTO.class);
    }

    public IUserService getUserService() {
        return userService;
    }

    public void setUserService(IUserService userService) {
        this.userService = userService;
    }

    /**
     * 
     * @param userId
     * @return
     */
    @GET
    @Path("/{userid}")
   // @Produces({ MediaType.APPLICATION_JSON })
    @Produces(MediaType.APPLICATION_JSON)
//    @Secured(value = { "ROLE_ADMIN" })
    public Response getUser(@PathParam("userid") String userId) {
        WUserDetails user = userService.getUserByUserName(userId);
        if (user == null) {
            throw new ResourceNotFoundException(userId);
        }
        return Response.ok(user).build();

    }

    /**
     * 
     * @param uriInfo
     * @param wuser
     * @return
     */
    @POST
//    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
//    @Secured(value = { "ROLE_ADMIN" }) @Valid
    public Response addUser(@Context UriInfo uriInfo,  WUser wuser) {
    	System.out.println("this is URI info"+uriInfo);
    	System.out.println("-------------\n"+wuser);
        return super.resourceCreated(uriInfo, userService.addUser(wuser));
    }

    /**
     * 
     * @param wuser
     * @return
     */
    @PUT
    @Path("/{userId}")
    @Produces({ MediaType.APPLICATION_JSON })
    @Consumes({ MediaType.APPLICATION_JSON })
    @Secured(value = { "ROLE_ADMIN" })
    public Response updateUser(@Valid WUser wuser) {
        userService.update(wuser);
        return resourceUpdated();

    }

    /**
     * 
     * @param userName
     * @return
     */
    @DELETE
    @Path("/{userId}")
    @Produces({ MediaType.APPLICATION_JSON })
    @Secured(value = { "ROLE_ADMIN" })
    public Response deleteUser(@PathParam("userId") String userName) {
        userService.delete(userName);
        return super.resourceDeleted();

    }

    /**
     * Returns user details and corresponding app initialisation data <br>
     * according to the current security context
     * 
     * @return
     */
    @GET
    @Path("/me")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response getAppInitialisationData(
            @QueryParam("includeCompetitor") boolean includeCompetitor) {
        return Response.ok(
                userService.getAppInitiationData(getUserDetails().getUserDto(),
                        includeCompetitor)).build();
    }

    /**
     * @param wPassword
     * @return
     */
    @POST
    @Path("/changePassword")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response changePassword(WPassword wPassword) {

        return Response.ok(
                userService.changePassword(getUserDetails().getUserDto(),
                        wPassword)).build();

    }
    
    
    @POST
    @Path("/editprofile")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.APPLICATION_JSON)
    public Response editProfile(WUserDetails wuserDetails) {
    	
    	return Response.ok(userService.editProfile(wuserDetails)).build();
    	
    }
    
}

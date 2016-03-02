/**
 * 
 */
package com.trucktrans.web.controllers;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.trucktrans.dao.IStateInfoDao;
import com.trucktrans.services.IFilterServices;


/**
 * @author Mayur
 * 12:22:51 am, 15-Oct-2015
 *
 */
@Path("/filters")
@Component
@Scope("request")
public class Filters {
	@Autowired
	IStateInfoDao stateInfoDao;
	@Autowired
    private IFilterServices filterService;

    @GET
    @Path("/filters")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response getFilters() {
        return Response.ok(stateInfoDao.getAllStates()).build();
    }
    
    @GET
    @Path("/print")
    @Produces({ MediaType.APPLICATION_JSON })
    public Response print() {
    	System.out.println("please print this statement");
        return Response.ok("man").build();
    }
    
}

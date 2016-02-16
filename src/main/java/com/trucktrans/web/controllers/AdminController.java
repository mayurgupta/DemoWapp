/**
 * 
 */
package com.trucktrans.web.controllers;

import javax.ws.rs.Path;
import javax.ws.rs.core.Response;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.services.IAdminService;
import com.trucktrans.services.IDashBoardService;

/**
 * @author Mayur
 * 8:51:19 pm, 10-Dec-2015
 *
 */
@Component
@Scope("request")
@Path("/spartans")
public class AdminController extends AbstractRestController<Object>{

	
	@Autowired
	IAdminService AdminService;
	
	
	public IAdminService getAdminService() {
		return AdminService;
	}


	public void setAdminService(IAdminService adminService) {
		AdminService = adminService;
	}


	public AdminController(Class<Object> t) {
		super(t);
		// TODO Auto-generated constructor stub
	}
	
	public Response userBookingDataReq(){
		
		
		return Response.ok(getAdminService().getUserData()).build();
	}
	
	

}

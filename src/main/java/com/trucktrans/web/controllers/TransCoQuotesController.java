/**
 * 
 */
package com.trucktrans.web.controllers;

import javax.ws.rs.Path;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

/**
 * @author mgupta
 *
 */
@Component
@Scope("request")
@Path("/quotes")
public class TransCoQuotesController extends AbstractRestController<Object>{

	public TransCoQuotesController(Class<Object> t) {
		super(t);
	}

	
	
}

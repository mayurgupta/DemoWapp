/**
 * 
 */
package com.trucktrans.web.controllers;

import java.util.HashMap;
import java.util.Map;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;

import org.springframework.security.core.context.SecurityContextHolder;

import com.sun.jersey.api.NotFoundException;
import com.trucktrans.security.UserPrincipal;

/**
 * @author Mayur
 * 10:21:40 pm, 18-Oct-2015
 *
 */
public class AbstractRestController<T> {

    private final Class<T> type;

    public AbstractRestController(Class<T> t) {
        this.type = t;
    }

    protected Map<String, String> getQueryParams(UriInfo uriInfo) {
        Map<String, String> params = new HashMap<String, String>();
        for (String k : uriInfo.getQueryParameters().keySet()) {
            params.put(k, uriInfo.getQueryParameters().getFirst(k));
        }
        return params;
    }

    protected Response resourceCreated(UriInfo uriInfo, Object id) {
        return Response
                .status(Response.Status.CREATED)
                .header("Location",
                        uriInfo.getRequestUri() + "/" + id.toString()).build();
    }

    protected Response resourceUpdated() {
        return Response.status(Response.Status.NO_CONTENT).build();
    }

    protected Response resourceDeleted() {
        return Response.status(Response.Status.ACCEPTED).build();
    }

    protected void checkForNull(Object obj) {
        if (obj == null) {
            throw new NotFoundException();
        }
    }

    // Method can be used by all the controllers to get the user details, No
    // need to query database.
    protected UserPrincipal getUserDetails() {
        return (UserPrincipal) SecurityContextHolder.getContext()
                .getAuthentication().getPrincipal();
    }

    public Class<T> getType() {
        return type;
    }

    // utility methods
}

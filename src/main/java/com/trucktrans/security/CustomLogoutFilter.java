/**
 * 
 */
package com.trucktrans.security;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.util.UrlUtils;
import org.springframework.util.Assert;
import org.springframework.web.filter.GenericFilterBean;

/**
 * @author Mayur
 * 10:32:20 pm, 11-Oct-2015
 *
 */
public class CustomLogoutFilter extends GenericFilterBean{


    private String filterProcessesUrl = "/api/logout";

    @Override
    public void doFilter(ServletRequest req, ServletResponse res,
            FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) req;
        HttpServletResponse response = (HttpServletResponse) res;
        if (requiresLogout(request, response)) {
            Authentication auth = SecurityContextHolder.getContext()
                    .getAuthentication();
            if (logger.isDebugEnabled()) {
                logger.debug("Logging out user '" + auth
                        + "' and transferring to logout destination");
            }

            Assert.notNull(request, "HttpServletRequest required");

            HttpSession session = request.getSession(false);
            if (session != null) {
                if (logger.isDebugEnabled()) {
                    logger.debug("Invalidating session: " + session.getId());
                }
                session.invalidate();
            }
            SecurityContextHolder.clearContext();
            return;
        }
        chain.doFilter(request, response);
    }

    /**
     * Allow subclasses to modify when a logout should take place.
     * 
     * @param request
     *            the request
     * @param response
     *            the response
     * 
     * @return <code>true</code> if logout should occur, <code>false</code>
     *         otherwise
     */
    protected boolean requiresLogout(HttpServletRequest request,
            HttpServletResponse response) {
        String uri = request.getRequestURI();
        int pathParamIndex = uri.indexOf(';');
        if (pathParamIndex > 0) {
            // strip everything from the first semi-colon
            uri = uri.substring(0, pathParamIndex);
        }
        int queryParamIndex = uri.indexOf('?');
        if (queryParamIndex > 0) {
            // strip everything from the first question mark
            uri = uri.substring(0, queryParamIndex);
        }
        if ("".equals(request.getContextPath())) {
            return uri.endsWith(filterProcessesUrl);
        }
        return uri.endsWith(request.getContextPath() + filterProcessesUrl);
    }

    public void setFilterProcessesUrl(String filterProcessesUrl) {
        Assert.isTrue(UrlUtils.isValidRedirectUrl(filterProcessesUrl),
                filterProcessesUrl + " isn't a valid value for"
                        + " 'filterProcessesUrl'");
        this.filterProcessesUrl = filterProcessesUrl;
    }

    protected String getFilterProcessesUrl() {
        return filterProcessesUrl;
    }


}

/**
 * 
 */
package com.trucktrans.web.filters;

/**
 * @author Mayur
 * 10:52:37 am, 19-Sep-2015
 * 
 * filter to supports josnp
 *
 */
import java.io.IOException;
import java.io.OutputStream;
import java.util.Map;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Component;

@Component(value = "jsonpFilter")
public class JsonPFilter implements Filter {

    public static final String CALLBACK_PARAM = "callback";
    private static final Logger LOGGER = Logger.getLogger(JsonPFilter.class);

    @Override
    public void init(FilterConfig fConfig) throws ServletException {
        // do nothing
    }

    @SuppressWarnings("unchecked")
	@Override
    public void doFilter(ServletRequest request, ServletResponse response,
            FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpRequest = (HttpServletRequest) request;
        HttpServletResponse httpResponse = (HttpServletResponse) response;

        Map<String, String[]> parms = httpRequest.getParameterMap();

        if (parms.containsKey(CALLBACK_PARAM)) {

            OutputStream out = httpResponse.getOutputStream();
            GenericResponseWrapper wrapper = new GenericResponseWrapper(
                    httpResponse);

            chain.doFilter(request, wrapper);

            out.write(new String(parms.get(CALLBACK_PARAM)[0] + "(").getBytes());
            out.write(wrapper.getData());
            out.write(");".getBytes());

            out.close();
        } else {
            try {
                chain.doFilter(request, response);
            } catch (IllegalArgumentException e) {
                // patch jersey unable to process request usi with [] chars
                HttpServletResponse r = (HttpServletResponse) response;
                r.setContentType("application/json");
                r.setStatus(HttpServletResponse.SC_NOT_FOUND);
                LOGGER.error("error in request processing", e);
            } catch (Exception e) {
                HttpServletResponse r = (HttpServletResponse) response;
                r.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
                LOGGER.error("error in request processing", e);
            }
        }
    }

    @Override
    public void destroy() {
        // do nothing
    }

}

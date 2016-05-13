/**
 * 
 */
package com.trucktrans.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.util.StringUtils;

import com.trucktrans.constants.ProjectConstants.AppConstants;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.web.WAppTrackInfo;
import com.trucktrans.helpers.TimeUtil;
import com.trucktrans.services.ILogService;

/**
 * @author Mayur
 * 1:58:55 pm, 19-Sep-2015
 *
 */
public class CustomAuthSuccessHandler extends SimpleUrlAuthenticationSuccessHandler{


    private static final Logger LOGGER = Logger
            .getLogger(CustomAuthSuccessHandler.class);
    
    @Autowired
    private ILogService logService;
    
    private RequestCache requestCache = new HttpSessionRequestCache();

    public void setRequestCache(RequestCache requestCache) {
        this.requestCache = requestCache;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
            HttpServletResponse response, Authentication authentication)
            throws ServletException, IOException {
        
        
        UserPrincipal user = (UserPrincipal)authentication.getPrincipal();
        UserDTO userd=user.getUserDto();
        if(userd.isPasswordChanged()){
            response.getOutputStream().write("{\"status\":1}".getBytes());
        }
        
        WAppTrackInfo appTrackInfo = new WAppTrackInfo();
        appTrackInfo.setUserName(user.getUsername());
		appTrackInfo.setActivity(AppConstants.LOGGEDIN.getVal());
		appTrackInfo.setTrackTime(TimeUtil.getTimestamp());
		appTrackInfo.setActivityDesc("User Logged in");
		logService.logApplicationTrackInfo(appTrackInfo,userd.getUserId());
		
        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("<<Custom Success handler Called>> "
                    + response.getHeader("Set-Cookie"));
        }

        SavedRequest savedRequest = requestCache.getRequest(request, response);
        if (savedRequest == null) {
            if (LOGGER.isDebugEnabled()) {
                LOGGER.debug("<<request cache is null>>");
            }
            return;
        }

        String targetUrlParameter = getTargetUrlParameter();
        if (isAlwaysUseDefaultTargetUrl()
                || (targetUrlParameter != null && StringUtils.hasText(request
                        .getParameter(targetUrlParameter)))) {

            super.onAuthenticationSuccess(request, response, authentication);
            return ;
        }
    }


}

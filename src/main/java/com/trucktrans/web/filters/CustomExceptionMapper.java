package com.trucktrans.web.filters;

import java.io.Serializable;
import java.util.Locale;

import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.stereotype.Component;

import com.trucktrans.exceptions.services.BadRequestException;
import com.trucktrans.exceptions.services.BaseException;
import com.trucktrans.exceptions.services.InternalServerException;
import com.trucktrans.exceptions.services.ResourceNotFoundException;

/**
 * 
 * 
 * 
 * 
 */

public class CustomExceptionMapper {
    private static final Logger LOGGER = Logger.getLogger(CustomExceptionMapper.class);

    private CustomExceptionMapper() {

    }

    @Provider
    @Component
    @Produces(MediaType.APPLICATION_JSON)
    public static class BaseExceptionMapper implements
            ExceptionMapper<BaseException> {

        @Autowired
        private MessageSource messageSource;

        private String getMessageValue(String key, Object[] valueArray) {
            Locale locale = LocaleContextHolder.getLocale();
            return messageSource.getMessage(key, valueArray, locale);
        }

        @Override
        public Response toResponse(BaseException runtimeException) {

            if (runtimeException instanceof BadRequestException) {
                return Response
                        .status(Response.Status.BAD_REQUEST)
                        .entity(new CustomExceptionResponse(
                                Response.Status.BAD_REQUEST.getStatusCode(),
                                runtimeException.getMessage())).build();
            } else if (runtimeException instanceof ResourceNotFoundException) {
                return Response
                        .status(Response.Status.NOT_FOUND)
                        .entity(new CustomExceptionResponse(
                                Response.Status.NOT_FOUND.getStatusCode(),
                                runtimeException.getMessage())).build();
            } else if (runtimeException instanceof InternalServerException) {
                LOGGER.error("internal server error", runtimeException);
                InternalServerException serverException = (InternalServerException) runtimeException;
                return Response
                        .status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity(new CustomExceptionResponse(
                                Response.Status.INTERNAL_SERVER_ERROR
                                        .getStatusCode(), getMessageValue(
                                        serverException.getKey(),
                                        serverException.getValue()))).build();
            } else {
                LOGGER.error("unknown error", runtimeException);
                return Response
                        .status(Response.Status.INTERNAL_SERVER_ERROR)
                        .entity(new CustomExceptionResponse(
                                Response.Status.INTERNAL_SERVER_ERROR
                                        .getStatusCode(), runtimeException
                                        .getMessage())).build();
            }
        }
    }

    @Provider
    @Component
    @Produces(MediaType.APPLICATION_JSON)
    public static class CustomWebApplicationExceptionMapper implements
            ExceptionMapper<WebApplicationException> {

        @Override
        public Response toResponse(WebApplicationException runtimeException) {
            Response r = runtimeException.getResponse();
            return Response.status(r.getStatus())
                    .entity(new CustomExceptionResponse(r.getStatus(), ""))
                    .type(MediaType.APPLICATION_JSON).build();

        }
    }

    public static class CustomExceptionResponse implements Serializable {
        private static final long serialVersionUID = 1L;

        private Integer errorCode;
        private String errorMessage;

        public CustomExceptionResponse() {
        }

        public CustomExceptionResponse(Integer errorCode, String message) {
            this.errorCode = errorCode;
            this.errorMessage = message;
        }

        public Integer getErrorCode() {
            return errorCode;
        }

        public void setErrorCode(Integer errorCode) {
            this.errorCode = errorCode;
        }

        public String getErrorMessage() {
            return errorMessage;
        }

        public void setErrorMessage(String errorMessage) {
            this.errorMessage = errorMessage;
        }

    }

}

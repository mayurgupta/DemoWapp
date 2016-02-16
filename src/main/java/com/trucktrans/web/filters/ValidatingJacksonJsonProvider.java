package com.trucktrans.web.filters;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.validation.ConstraintViolation;
import javax.validation.Valid;
import javax.validation.Validation;
import javax.validation.Validator;
import javax.validation.ValidatorFactory;
import javax.ws.rs.Consumes;
import javax.ws.rs.Produces;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.MultivaluedMap;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;
import javax.ws.rs.ext.MessageBodyReader;
import javax.ws.rs.ext.MessageBodyWriter;
import javax.ws.rs.ext.Provider;

import org.apache.log4j.Logger;
import org.codehaus.jackson.jaxrs.JacksonJsonProvider;
import org.springframework.stereotype.Component;

@Component
@Provider
@Consumes({ MediaType.APPLICATION_JSON })
@Produces({ MediaType.APPLICATION_JSON })
public class ValidatingJacksonJsonProvider implements
        MessageBodyReader<Object>, MessageBodyWriter<Object> {

    private static final Logger LOGGER = Logger
            .getLogger(ValidatingJacksonJsonProvider.class);

    private final JacksonJsonProvider delegate;

    private final Validator validator;

    public ValidatingJacksonJsonProvider() {
        delegate = new JacksonJsonProvider();
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Override
    public Object readFrom(Class<Object> type, Type genericType,
            Annotation[] annotations, MediaType mediaType,
            MultivaluedMap<String, String> httpHeaders, InputStream entityStream)
            throws IOException {

        LOGGER.debug("reading from stream");
        Object value = null;
        try {
            value = parseEntity(type, genericType, annotations, mediaType,
                    httpHeaders, entityStream);

        } catch (Exception e) {
            throw new WebApplicationException(e,Response
                    .status(Response.Status.BAD_REQUEST)
                    .entity(new CustomExceptionMapper.CustomExceptionResponse(
                            Response.Status.BAD_REQUEST.getStatusCode(),
                            "unable to process entity"))
                    .type(MediaType.APPLICATION_JSON).build());
        }

        LOGGER.debug("object processed");

        if (hasValidAnnotation(annotations)) {
            List<String> errors = validate(value);
            if (!errors.isEmpty()) {
                StringBuilder msg = new StringBuilder(
                        "The request entity had the following errors:\n");
                for (String error : errors) {
                    msg.append("  * ").append(error).append('\n');
                }
                throw new WebApplicationException(badRequest(msg.toString()));
            }
        }

        return value;
    }

    private Object parseEntity(Class<Object> type, Type genericType,
            Annotation[] annotations, MediaType mediaType,
            MultivaluedMap<String, String> httpHeaders, InputStream entityStream)
            throws IOException {
        return delegate.readFrom(type, genericType, annotations, mediaType,
                httpHeaders, entityStream);
    }

    @Override
    public void writeTo(Object t, Class<?> type, Type genericType,
            Annotation[] annotations, MediaType mediaType,
            MultivaluedMap<String, Object> httpHeaders,
            OutputStream entityStream) throws IOException {
        delegate.writeTo(t, type, genericType, annotations, mediaType,
                httpHeaders, entityStream);
    }

    @Override
    public boolean isWriteable(Class<?> type, Type genericType,
            Annotation[] annotations, MediaType mediaType) {
        return delegate.isWriteable(type, genericType, annotations, mediaType);
    }

    @Override
    public long getSize(Object t, Class<?> type, Type genericType,
            Annotation[] annotations, MediaType mediaType) {
        return delegate.getSize(t, type, genericType, annotations, mediaType);
    }

    @Override
    public boolean isReadable(Class<?> type, Type genericType,
            Annotation[] annotations, MediaType mediaType) {
        return delegate.isReadable(type, genericType, annotations, mediaType);
    }

    private List<String> validate(Object o) {
        Set<String> errors = new HashSet<String>();
        Set<ConstraintViolation<Object>> violations = validator.validate(o);
        for (ConstraintViolation<Object> v : violations) {
            errors.add(String.format("%s %s (was %s)", v.getPropertyPath(),
                    v.getMessage(), v.getInvalidValue()));
        }
        return new ArrayList<String>(errors);
    }

    static boolean hasValidAnnotation(Annotation[] annotations) {
        for (Annotation annotation : annotations) {
            if (Valid.class.equals(annotation.annotationType())) {
                return true;
            }
        }
        return false;
    }

    private static Response badRequest(String msg) {
        return Response.status(Status.BAD_REQUEST).entity(msg)
                .type(MediaType.APPLICATION_JSON).build();
    }

}
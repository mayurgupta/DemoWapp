/**
 * 
 */
package com.trucktrans.services.impl;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Properties;

import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import com.trucktrans.helpers.PropertyBean;
import com.trucktrans.services.PropertiesService;


/**
 * @author Mayur
 * 11:54:23 pm, 14-Oct-2015
 *
 */
@Service
public class PropertiesServiceImpl implements PropertiesService{

	private Resource location;
    private Properties appProperties;

    public void setLocation(Resource location) throws IOException {
        this.location = location;
        appProperties = new Properties();
		appProperties.load(location.getInputStream());
    }
    
    PropertiesServiceImpl(){
    	System.out.println("saare jahan se achha hindustaan hummara");
    }
    
    
    public Resource getLocation() {
		return location;
	}

	public List<PropertyBean> findAll() {
        List<PropertyBean> retVal = new ArrayList<PropertyBean>();
        for (Map.Entry<Object, Object> property : appProperties
                .entrySet()) {
            retVal.add(new PropertyBean((String) property.getKey(),
                    (String) property.getValue()));
        }

        return retVal;
    }

    public PropertyBean findByPropertyName(String propertyName) {
        String value = appProperties.getProperty(propertyName);

        if (value == null) {
            return null;
        }

        return new PropertyBean(propertyName, value);
    }

    public List<PropertyBean> findByPropertyBaseName(
            String propertyBaseName) {
        List<PropertyBean> retVal = new ArrayList<PropertyBean>();
        for (Map.Entry<Object, Object> property : appProperties
                .entrySet()) {
            if (((String) property.getKey()).startsWith(propertyBaseName)) {
                retVal.add(new PropertyBean((String) property.getKey(),
                        (String) property.getValue()));
            }
        }

        return retVal;
    }

}

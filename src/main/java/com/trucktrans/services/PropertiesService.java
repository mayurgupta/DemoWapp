/**
 * 
 */
package com.trucktrans.services;

import java.util.List;

import com.trucktrans.helpers.PropertyBean;

/**
 * @author Mayur
 * 12:35:16 am, 13-Oct-2015
 *
 */
public interface PropertiesService {
	 /**
     * 
     * @return
     */
    List<PropertyBean> findAll();

    /**
     * 
     * @param propertyName
     * @return
     */
    PropertyBean findByPropertyName(String propertyName);

    /**
     * Returns all Environment Variables sharing the same base name for the
     * Property. I.E. Returns all Variables with Property Name:
     * propertyBaseName*
     * 
     * @param propertyBaseName
     * @return
     */
    List<PropertyBean> findByPropertyBaseName(String propertyBaseName);
}

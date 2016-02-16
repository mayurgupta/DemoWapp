/**
 * 
 */
package com.trucktrans.helpers;

/**
 * @author Mayur
 * 12:36:20 am, 13-Oct-2015
 *
 */
public class PropertyBean {

    private static final long serialVersionUID = 4980896039783451193L;

    private String propertyName;

    private String propertyValue;

    /**
     * Constructor
     */
    public PropertyBean() {
    }

    public PropertyBean(String name, String value) {
        this.propertyName = name;
        this.propertyValue = value;
    }

    public String getPropertyName() {
        return propertyName;
    }

    public void setPropertyName(String propertyName) {
        this.propertyName = propertyName;
    }

    public String getPropertyValue() {
        return propertyValue;
    }

    public void setPropertyValue(String propertyValue) {
        this.propertyValue = propertyValue;
    }

    @Override
    public String toString() {
        return "" + propertyName + "=" + propertyValue;
    }

}

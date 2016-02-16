/**
 * 
 */
package com.trucktrans.exceptions.services;

import com.trucktrans.constants.MessageConstants;
import com.trucktrans.exceptions.services.BaseException;

/**
 * @author Mayur
 * 5:06:44 pm, 20-Sep-2015
 *
 */
public class InternalServerException extends BaseException {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String key;
	private Object[] value;

	public InternalServerException(Throwable e,MessageConstants messageConstant,
			Object... valueArray) {
		super();
		this.key = messageConstant.getVal();
		this.value = valueArray;
		this.setStackTrace(e.getStackTrace());
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public Object[] getValue() {
		return value;
	}

	public void setValue(Object[] value) {
		if(value == null) { 
		    this.value = new Object[0]; 
		  } else { 
		   this.value = value.clone(); 
		  } 
	}
}
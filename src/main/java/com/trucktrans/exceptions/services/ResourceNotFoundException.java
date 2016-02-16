/**
 * 
 */
package com.trucktrans.exceptions.services;

import com.trucktrans.exceptions.services.BaseException;

/**
 * thrown by service layer when resource requested not found
 * 
 * @author Mayur
 * 5:07:06 pm, 20-Sep-2015
 *
 */
public class ResourceNotFoundException extends BaseException {
	private static final long serialVersionUID = 1L;

	public ResourceNotFoundException(Object resourId) {
		super(resourId != null ? resourId.toString() : null);
	}
}

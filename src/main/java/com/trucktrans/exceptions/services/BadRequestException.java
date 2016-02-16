/**
 * 
 */
package com.trucktrans.exceptions.services;

import com.trucktrans.exceptions.services.BaseException;

/**
 * Thrown by service layer when request parameter are wrong
 * 
 * @author Mayur
 * 5:06:06 pm, 20-Sep-2015
 *
 */
public class BadRequestException extends BaseException {
	private static final long serialVersionUID = 1L;

	public BadRequestException() {

	}

	public BadRequestException(String message) {
		super(message);
	}
}

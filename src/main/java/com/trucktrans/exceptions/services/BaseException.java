/**
 * 
 */
package com.trucktrans.exceptions.services;

/**
 * @author Mayur
 * 5:06:27 pm, 20-Sep-2015
 *
 */
public class BaseException extends RuntimeException {

	private static final long serialVersionUID = 1L;
	private int errorCode;
	private String errorMessage;

	public BaseException() {

	}

	public BaseException(String message) {
		super(message);
		this.errorMessage = message;
	}

	public int getErrorCode() {
		return errorCode;
	}

	public void setErrorCode(int errorCode) {
		this.errorCode = errorCode;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}

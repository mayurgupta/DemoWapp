/**
 * 
 */
package com.trucktrans.constants;

/**
 * @author Mayur
 *
 */
public enum BnQConstants {

	READ("read"),
	UNREAD("unread"),
	ACCEPT("accept"),
	DECLINE("decline"),
	QUOTEID("quoteid="),
	ADDRESS_EXPORT("#/pdfexport"),
	AND_SIGN("&");
	private final String value;
	
	private BnQConstants(String type) {
		this.value = type;
	}

	public String getValue() {
		return value;
	}
	
	
	
}

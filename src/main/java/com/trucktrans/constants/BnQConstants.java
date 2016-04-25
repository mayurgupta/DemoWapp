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
	DECLINE("decline");
	
	private final String val;
	
	private BnQConstants(String type) {
		this.val = type;
	}

	public String getVal() {
		return val;
	}
	
	
	
}

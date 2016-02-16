/**
 * 
 */
package com.trucktrans.constants;

/**
 * @author Mayur
 * 2:38:09 am, 06-Oct-2015
 *
 */
public final class ProjectConstants {
	public enum AppConstants {
		LOGGEDIN("LOGGED IN");
		private final String val;

		private AppConstants(String val) {
			this.val = val;
		}

		public final String getVal() {
			return val;
		}
	}
	
	
}

/**
 * 
 */
package com.trucktrans.helpers;

import java.text.MessageFormat;

/**
 * @author Mayur
 * 12:32:08 am, 14-Oct-2015
 *
 */
public class Util {

	private Util() {

	}
	 /**
     * 
     * @param text
     * @param placeHolders
     * @return
     */
    public static String formatString(String text, Object[] placeHolders){
        return MessageFormat.format(text, placeHolders);
    }
}

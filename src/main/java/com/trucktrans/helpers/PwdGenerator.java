/**
 * 
 */
package com.trucktrans.helpers;

import java.util.Random;

/**
 * @author Mayur
 * 12:20:47 am, 14-Oct-2015
 *
 */
public class PwdGenerator {
	/*
	 * This method generates a random n digit password, which contains at least
	 * one number, lower case alphabet, upper case alphabet and as special
	 * character.
	 */
	private PwdGenerator(){};

	private static final String ALPHA_CAPS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	private static final String ALPHA = "abcdefghijklmnopqrstuvwxyz";
	private static final String NUM = "0123456789";
	private static final String SPL_CHARS = "!@#$%-*_()";
	    
	public static char[] generatePswd(int minLen, int maxLen,
			int noOfCAPSAlpha, int noOfDigits, int noOfSplChars) {
		if (minLen > maxLen) {
			throw new IllegalArgumentException("Min. Length > Max. Length!");
		}
		if ((noOfCAPSAlpha + noOfDigits + noOfSplChars) > minLen) {
			throw new IllegalArgumentException(
					"Min. Length should be atleast sum of (CAPS, DIGITS, SPL CHARS) Length!");
		}
		Random rnd = new Random();
		int len = rnd.nextInt(maxLen - minLen + 1) + minLen;
		char[] pswd = new char[len];
		int index = 0;
		for (int i = 0; i < noOfCAPSAlpha; i++) {
			index = getNextIndex(rnd, len, pswd);
			pswd[index] = ALPHA_CAPS.charAt(rnd.nextInt(ALPHA_CAPS.length()));
		}
		for (int i = 0; i < noOfDigits; i++) {
			index = getNextIndex(rnd, len, pswd);
			pswd[index] = NUM.charAt(rnd.nextInt(NUM.length()));
		}
		for (int i = 0; i < noOfSplChars; i++) {
			index = getNextIndex(rnd, len, pswd);
			pswd[index] = SPL_CHARS.charAt(rnd.nextInt(SPL_CHARS.length()));
		}
		for (int i = 0; i < len; i++) {
			if (pswd[i] == 0) {
				pswd[i] = ALPHA.charAt(rnd.nextInt(ALPHA.length()));
			}
		}
		return pswd;
	}
	     
	private static int getNextIndex(Random rnd, int len, char[] pswd) {
		int index = rnd.nextInt(len);
		while (pswd[index] != 0) {
			return 0;
		}
		return index;
	}
}

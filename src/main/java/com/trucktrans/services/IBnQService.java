/**
 * 
 */
package com.trucktrans.services;


/**
 * @author mgupta
 *
 */
public interface IBnQService {

	Object searchBookings(String source, String destination, long datefrom,
			long dateto, int offset);

	Object getBookings(int offset);

}

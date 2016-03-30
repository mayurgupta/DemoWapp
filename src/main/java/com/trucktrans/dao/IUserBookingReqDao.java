/**
 * 
 */
package com.trucktrans.dao;

import javax.ws.rs.core.Response;

import com.trucktrans.entity.dto.UserBookingReqDTO;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.web.WUserBooking;

/**
 * @author Mayur
 * 11:10:51 pm, 29-Oct-2015
 *
 */
public interface IUserBookingReqDao extends IEntityDao<UserBookingReqDTO, Long>{

	void planTransportation(WUserBooking userBooking, UserDTO userDTO);

	Object getBookingHistory(UserDTO user);

	Object getSearchResults(String source, String destination, long datefrom,
			long dateto, int offset);

	Object getAllBookings(int offset);
	
}

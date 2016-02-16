/**
 * 
 */
package com.trucktrans.dao;

import com.trucktrans.entity.dto.UserBookingReqDTO;
import com.trucktrans.entity.web.WUserBooking;

/**
 * @author Mayur
 * 11:10:51 pm, 29-Oct-2015
 *
 */
public interface IUserBookingDao extends IEntityDao<UserBookingReqDTO, Long>{

	void planTransportation(WUserBooking userBooking);
	
}

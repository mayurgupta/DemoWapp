/**
 * 
 */
package com.trucktrans.dao.impl;

import org.springframework.stereotype.Repository;

import com.trucktrans.dao.IUserBookingDao;
import com.trucktrans.entity.dto.UserBookingReqDTO;
import com.trucktrans.entity.web.WUserBooking;

/**
 * @author Mayur 11:14:32 pm, 29-Oct-2015
 *
 */
@Repository
public class UserBookingDaoImpl extends AbstractHibernateDaoImpl<UserBookingReqDTO, Long> implements IUserBookingDao {

	@Override
	public void planTransportation(WUserBooking userBooking) {
		UserBookingReqDTO userBookingReqDTO=new UserBookingReqDTO();
		userBookingReqDTO.setDestinationAddress(userBooking.getDestinationAddress());
		//TODO
//		userBookingReqDTO.setDestinationPlaceId(userBooking.getDestinationPlace());
	}

}

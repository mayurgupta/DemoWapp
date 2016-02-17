/**
 * 
 */
package com.trucktrans.dao.impl;

import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.trucktrans.dao.IUserBookingReqDao;
import com.trucktrans.entity.dto.UserBookingReqDTO;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.web.WUserBooking;

/**
 * @author Mayur 11:14:32 pm, 29-Oct-2015
 *
 */
@Repository
public class UserBookingReqDaoImpl extends AbstractHibernateDaoImpl<UserBookingReqDTO, Long> implements IUserBookingReqDao {

	@Override
	public void planTransportation(WUserBooking userBooking) {
		UserBookingReqDTO userBookingReqDTO=new UserBookingReqDTO();
		userBookingReqDTO.setDestinationAddress(userBooking.getDestinationAddress());
		//TODO
//		userBookingReqDTO.setDestinationPlaceId(userBooking.getDestinationPlace());
	}

	@Override
	public Object getBookingHistory(UserDTO user) {
		// TODO Auto-generated method stub
		return (UserBookingReqDTO)getSessionFactory().getCurrentSession().createCriteria(UserBookingReqDTO.class)
				.add(Restrictions.eq("UserDTO.userId", user.getUserId()));
	}
	
	

}

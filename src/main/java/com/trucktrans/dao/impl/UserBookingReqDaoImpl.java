/**
 * 
 */
package com.trucktrans.dao.impl;

import java.util.Calendar;
import java.util.Date;

import org.hibernate.criterion.Restrictions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.trucktrans.dao.IStateInfoDao;
import com.trucktrans.dao.IUserBookingReqDao;
import com.trucktrans.dao.IUserDao;
import com.trucktrans.entity.dto.UserBookingReqDTO;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.web.WUser;
import com.trucktrans.entity.web.WUserBooking;
import com.trucktrans.services.IUserService;

/**
 * @author Mayur 11:14:32 pm, 29-Oct-2015
 *
 */
@Repository
public class UserBookingReqDaoImpl extends AbstractHibernateDaoImpl<UserBookingReqDTO, Long> implements IUserBookingReqDao {

	@Autowired
	IStateInfoDao stateInfo;
	
	@Autowired
	IUserDao userDao;
	
	@Autowired
	IUserService userService;
	
	
	@Override
	public void planTransportation(WUserBooking wUserBooking, UserDTO userDTO) {
		UserBookingReqDTO userBookingReqDTO=new UserBookingReqDTO();
		if (userDTO != null) {
			userBookingReqDTO.setUser(userDTO);
		}
		else if (userDao.getByEmail(wUserBooking.getEmail()) != null) {
			userBookingReqDTO.setUser(userDao.getByEmail(wUserBooking.getEmail()));
		}
		else if (userDao.getByEmail(wUserBooking.getEmail()) == null) {
			WUser wUser=new WUser();
			wUser.setEmail(wUserBooking.getEmail());
			wUser.setName(wUserBooking.getName());
			userService.addUser(wUser);
			UserDTO newUserDto=new UserDTO();
			newUserDto.setEmail(wUserBooking.getEmail());
			newUserDto.setName(wUserBooking.getName());
			userBookingReqDTO.setUser(userDao.getByEmail(wUserBooking.getEmail()));
		}
		userBookingReqDTO.setDestinationAddress(wUserBooking.getDestinationAddress());
		userBookingReqDTO.setDateOfRequest(wUserBooking.getDateOfRequest());
		userBookingReqDTO.setDestinationPlace(wUserBooking.getDestinationPlace());
		userBookingReqDTO.setDestinationState(stateInfo.getByName(wUserBooking.getDestinationState()));
		userBookingReqDTO.setPartialLoadFlag(false);// keep it false for now
		userBookingReqDTO.setRemarks(wUserBooking.getRemarks());
		userBookingReqDTO.setSourceAddress(wUserBooking.getSourceAddress());
		userBookingReqDTO.setSourcePlace(wUserBooking.getSourcePlace());
		userBookingReqDTO.setSourceState(stateInfo.getByName(wUserBooking.getSourceState()));
		merge(userBookingReqDTO);
	}

	@Override
	public Object getBookingHistory(UserDTO user) {
		// TODO Auto-generated method stub
		return (UserBookingReqDTO)getSessionFactory().getCurrentSession().createCriteria(UserBookingReqDTO.class)
				.add(Restrictions.eq("UserDTO.userId", user.getUserId()));
	}
	
	

}

/**
 * 
 */
package com.trucktrans.services;

import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.web.WUserBooking;

/**
 * @author Mayur
 *
 */
public interface IInitialiseService {

	Object planGuestTransportation(WUserBooking userBooking, UserDTO userDTO);

}

/**
 * 
 */
package com.trucktrans.services;

import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.web.WUserBooking;

/**
 * @author Mayur
 * 10:31:00 pm, 29-Oct-2015
 *
 */
public interface IDashBoardService {

	Object planTransportation(WUserBooking userBooking, UserDTO userDTO);

}

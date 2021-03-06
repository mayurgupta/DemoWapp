/**
 * 
 */
package com.trucktrans.services;

import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.web.WAppTrackInfo;

/**
 * @author Mayur
 * 10:18:46 pm, 19-Sep-2015
 *
 */
public interface ILogService {


	/**
	 * Logs tracking information of application to db 
	 * @param appTrackInfo
	 * @param userd 
	 */
	void logApplicationTrackInfo(WAppTrackInfo appTrackInfo, Long userd);

	
}

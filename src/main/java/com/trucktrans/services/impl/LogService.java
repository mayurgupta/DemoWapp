/**
 * 
 */
package com.trucktrans.services.impl;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.trucktrans.dao.ILogDao;
import com.trucktrans.dao.IUserDao;
import com.trucktrans.entity.dto.AppTrackInfoDTO;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.web.WAppTrackInfo;
import com.trucktrans.services.ILogService;
import com.trucktrans.services.impl.LogService;

/**
 * @author Mayur
 * 10:20:39 pm, 19-Sep-2015
 *
 */
@Service
@Transactional(readOnly = true)
public class LogService implements ILogService {

	private static final Logger LOGGER = Logger.getLogger(LogService.class);

	@Autowired
	private ILogDao logDao;
	
	@Autowired
	private IUserDao userDao;
	
	
	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	public void logApplicationTrackInfo(WAppTrackInfo wAppTrackInfo, UserDTO userd) {
		AppTrackInfoDTO appTrackDto=new AppTrackInfoDTO();
		appTrackDto.setUserDTO(userd);
		appTrackDto.setTrackedDate(wAppTrackInfo.getTrackTime());
		appTrackDto.setActivity(wAppTrackInfo.getActivity());
		appTrackDto.setActivityDescription(wAppTrackInfo.getActivityDesc());
/*		AppTrackInfoDTO appTrackDto = new AppTrackInfoDTO(wAppTrackInfo.getUserName(),
				wAppTrackInfo.getActivity(), wAppTrackInfo.getTrackTime(),
				appTrackInfo.getActivityDesc());
*/
		try{
		logDao.merge(appTrackDto);
		}catch(Exception e){
			LOGGER.error("Error occurred while logging application tracking information");
		}
	}


}

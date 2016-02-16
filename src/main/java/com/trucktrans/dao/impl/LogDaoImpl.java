/**
 * 
 */
package com.trucktrans.dao.impl;

import org.springframework.stereotype.Repository;

import com.trucktrans.dao.ILogDao;
import com.trucktrans.entity.dto.AppTrackInfoDTO;


/**
 * @author Mayur
 * 11:22:11 pm, 14-Oct-2015
 *
 */
@Repository
public class LogDaoImpl extends AbstractHibernateDaoImpl<AppTrackInfoDTO, Long> implements ILogDao {

	public LogDaoImpl() {
		super(AppTrackInfoDTO.class);
	}
}
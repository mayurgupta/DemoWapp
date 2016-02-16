/**
 * 
 */
package com.trucktrans.services.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.services.IFilterServices;
import com.trucktrans.web.WFilterResponse;

;



/**
 * @author Mayur
 * 11:47:40 pm, 14-Oct-2015
 *
 */
@Service
@Transactional(readOnly = true)
public class FilterServiceImpl implements IFilterServices{

	@Override
	public Map<String, List<WFilterResponse>> getFilters() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List getAppInitialFilters(UserDTO user, boolean includeCompetitor) {
		
		
		return null;
	}
	
	
	
	
}

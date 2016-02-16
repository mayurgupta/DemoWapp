/**
 * 
 */
package com.trucktrans.services;

import java.util.List;
import java.util.Map;

import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.web.WFilterResponse;



/**
 * @author Mayur
 * 12:27:53 am, 13-Oct-2015
 *
 */
public interface IFilterServices {

	/**
	 * 
	 * @return Map<String ,List<WFilterResponse>)> WFilterResponse is a class
	 *         with state name and List of CityHospitalResponse objects
	 *         CityHospitalResponse is class with city name and list of
	 *         hospitals
	 * 
	 */
	Map<String, List<WFilterResponse>> getFilters();

	/**
	 * @param user
	 * @return list clusters<br>
	 */
	List getAppInitialFilters(UserDTO user,boolean includeCompetitor);
}

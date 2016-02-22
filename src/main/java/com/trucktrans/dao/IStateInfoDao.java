/**
 * 
 */
package com.trucktrans.dao;


import java.util.List;

import com.trucktrans.entity.dto.StateInfoDTO;

/**
 * @author Mayur
 * 6:43:44 pm, 19-Feb-2016
 *
 */
public interface IStateInfoDao extends IEntityDao<StateInfoDTO, Long>{
	
	public StateInfoDTO getByName(String stateName);
	public StateInfoDTO getById(Long stateId);
	public List<StateInfoDTO> getAllStates();
}

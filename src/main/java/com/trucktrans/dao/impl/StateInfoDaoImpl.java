/**
 * 
 */
package com.trucktrans.dao.impl;

import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.trucktrans.dao.IStateInfoDao;
import com.trucktrans.entity.dto.StateInfoDTO;

/**
 * @author Mayur
 * 6:45:37 pm, 19-Feb-2016
 *
 */

@Repository
public class StateInfoDaoImpl extends AbstractHibernateDaoImpl<StateInfoDTO, Long> implements IStateInfoDao{

	public StateInfoDTO getByName(String stateName){
		return (StateInfoDTO)getSessionFactory().getCurrentSession().createCriteria(StateInfoDTO.class)
				.add(Restrictions.like("name", stateName));
	}
	
	public StateInfoDTO getById(Long stateId){
		return (StateInfoDTO)getSessionFactory().getCurrentSession().createCriteria(StateInfoDTO.class)
				.add(Restrictions.eq("stateId", stateId));
	}
	
}

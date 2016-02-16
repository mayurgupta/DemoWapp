/**
 * 
 */
package com.trucktrans.dao.impl;

import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.trucktrans.dao.IUserRolesDao;
import com.trucktrans.entity.dto.UserRoleDTO;

/**
 * @author Mayur
 * 9:01:05 pm, 13-Oct-2015
 *
 */
@Repository
public class UserRolesDaoImpl extends AbstractHibernateDaoImpl<UserRoleDTO, Long> implements IUserRolesDao{

	public UserRolesDaoImpl() {
        super(UserRoleDTO.class);
    }

	
	
	@Override
    public UserRoleDTO getByName(String name) {
        return (UserRoleDTO) getSessionFactory().getCurrentSession()
                .createCriteria(UserRoleDTO.class)
                .add(Restrictions.eq("authority", name)).uniqueResult();
    }

}

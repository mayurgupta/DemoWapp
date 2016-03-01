/**
 * 
 */
package com.trucktrans.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.trucktrans.dao.IUserDao;
import com.trucktrans.dao.impl.AbstractHibernateDaoImpl;
import com.trucktrans.entity.dto.UserDTO;

/**
 * @author Mayur
 * 12:37:55 am, 13-Oct-2015
 *
 */
@Repository
public class UserDaoImpl extends AbstractHibernateDaoImpl<UserDTO, Long>
implements IUserDao{

    public UserDaoImpl() {
        super(UserDTO.class);
    }

    @Override
    public UserDTO getByUserName(String username) {
        Session session = getSessionFactory().getCurrentSession();
        Criteria criteria = session.createCriteria(UserDTO.class).add(
                Restrictions.eq("userName", username));

        criteria.setCacheable(true);
        return (UserDTO) criteria.uniqueResult();

    }

    @Override
    public UserDTO getByEmail(String email) {
        Session session = getSessionFactory().getCurrentSession();
        Criteria criteria = session.createCriteria(UserDTO.class).add(
                Restrictions.eq("email", email));
        return (UserDTO) criteria.uniqueResult();

    }

    @Override
    public void deactivate(UserDTO userDTO) {
        if (!userDTO.getEnabled()) {
            userDTO.setEnabled(false);
        }
        update(userDTO);
    }

    @Override
    public void activate(UserDTO userDTO) {
        if (!userDTO.getEnabled()) {
            userDTO.setEnabled(true);
        }
        update(userDTO);
    }
    
    
    private Criteria buildQueryFromParams(ProfileQueryBuilder queryBuilder) {
		return null;
    	
    }

    
}

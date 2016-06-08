/**
 * 
 */
package com.trucktrans.dao.impl;

import org.hibernate.Criteria;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.criterion.Restrictions;
import org.springframework.stereotype.Repository;

import com.trucktrans.dao.IUserDao;
import com.trucktrans.dao.impl.AbstractHibernateDaoImpl;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.dto.UserDetailsInfoDTO;
import com.trucktrans.entity.web.WUserDetails;

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
    public UserDTO getByUserId(Long userId) {
        Session session = getSessionFactory().getCurrentSession();
        Criteria criteria = session.createCriteria(UserDTO.class).add(
                Restrictions.eq("userId", userId));

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

	@Override
	public UserDTO editProfile(WUserDetails wuser) {

		UserDTO userdto=getByEmail(wuser.getEmail());
		UserDetailsInfoDTO userDetailsInfo=new UserDetailsInfoDTO();
		
		if (wuser.getCity() != null) {
			userDetailsInfo.setCity(wuser.getCity());
		}
		if (wuser.getLandMark() != null) {
			userDetailsInfo.setLandMark(wuser.getLandMark());			
		}
		if (wuser.getLandMark() != null) {
			userDetailsInfo.setLandMark(wuser.getLandMark());			
		}
		if (wuser.getPincode() != null) {
			userDetailsInfo.setPincode(wuser.getPincode());	
		}
		if (wuser.getPrimaryPhone() != null) {
			userDetailsInfo.setPrimaryPhone(wuser.getPrimaryPhone());	
		}
		if (wuser.getSecondaryPhone() != null) {
			userDetailsInfo.setSecondaryPhone(wuser.getSecondaryPhone());
		}
		if (wuser.getState() != null) {
			userDetailsInfo.setState(wuser.getState());	
		}
		userDetailsInfo.setUser(userdto);
		userdto.setDetailsInfoDTO(userDetailsInfo);
		update(userdto);

		return null;
	}
}

/**
 * 
 */
package com.trucktrans.security;

import java.util.ArrayList;
import java.util.Collection;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.trucktrans.dao.IUserDao;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.dto.UserRolesREF;

/**
 * @author Mayur
 * 10:56:16 pm, 14-Oct-2015
 *
 */

@Service("userDetailsService")
@Transactional(readOnly = true)
public class UserDetailsServiceImpl implements UserDetailsService{

    private static final Logger LOGGER = Logger
            .getLogger(UserDetailsServiceImpl.class);

    @Autowired
    private IUserDao userDao;

    public IUserDao getUserDao() {
        return userDao;
    }

    public void setUserDao(IUserDao userDao) {
        this.userDao = userDao;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username)
            throws UsernameNotFoundException, DataAccessException {

        if (LOGGER.isDebugEnabled()) {
            LOGGER.debug("get user by name :" + username);
        }
        UserDTO userEntity = userDao.getByUserName(username);

        if (userEntity == null) {
            throw new UsernameNotFoundException("user not found");
        }

        return buildSpringUser(userEntity);
    }

    private UserDetails buildSpringUser(UserDTO u) {

        String username = u.getUserName();
        String password = u.getPassword();
        boolean enabled = u.getEnabled();
        boolean accountNonExpired = u.getEnabled();
        boolean credentialsNonExpired = u.getEnabled();
        boolean accountNonLocked = u.getEnabled();

        Collection<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
        for (UserRolesREF role : u.getUserRolesREFs()) {
            authorities.add(new SimpleGrantedAuthority(role.getUserRoleDTO()
                    .getAuthority()));
        }

        return new UserPrincipal(username, password, enabled,
                accountNonExpired, credentialsNonExpired, accountNonLocked,
                authorities, u);
    }

}

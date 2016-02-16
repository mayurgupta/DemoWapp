/**
 * 
 */
package com.trucktrans.security;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import com.trucktrans.entity.dto.UserDTO;

/**
 * @author Mayur
 * 10:25:11 pm, 19-Sep-2015
 *
 */
public class UserPrincipal extends User{


    private static final long serialVersionUID = 1L;
    private final UserDTO userDto;

    public UserPrincipal(String username, String password, boolean enabled,
            boolean accountNonExpired, boolean credentialsNonExpired,
            boolean accountNonLocked,
            Collection<? extends GrantedAuthority> authorities, UserDTO dto) {
        super(username, password, enabled, accountNonExpired,
                credentialsNonExpired, accountNonLocked, authorities);
        userDto = dto;
    }

    public UserDTO getUserDto() {
        return userDto;
    }



}

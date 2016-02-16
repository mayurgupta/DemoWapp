/**
 * 
 */
package com.trucktrans.dao;

import com.trucktrans.entity.dto.UserDTO;

/**
 * @author Mayur
 * 10:55:13 pm, 07-Oct-2015
 *
 */
public interface IUserDao extends IEntityDao<UserDTO, Long> {

    /**
     * return user by given username
     * 
     * @param username
     */
    UserDTO getByUserName(String username);

    /**
     * 
     * @param email
     */
    UserDTO getByEmail(String email);

    /**
     * deactivates the user if active
     * 
     * @param userDTO
     */

    void deactivate(UserDTO userDTO);

    /**
     * activates user, does nothing if user already active
     * 
     * @param userDTO
     */
    void activate(UserDTO userDTO);

}

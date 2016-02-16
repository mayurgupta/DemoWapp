/**
 * 
 */
package com.trucktrans.dao;

import com.trucktrans.entity.dto.UserRoleDTO;

/**
 * @author Mayur
 * 8:57:19 pm, 13-Oct-2015
 *
 */
public interface IUserRolesDao extends IEntityDao<UserRoleDTO, Long>{

	UserRoleDTO getByName(String name);
}

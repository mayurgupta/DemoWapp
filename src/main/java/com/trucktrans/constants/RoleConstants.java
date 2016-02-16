/**
 * 
 */
package com.trucktrans.constants;

/**
 * @author Mayur
 * 11:25:40 pm, 13-Oct-2015
 *
 */
public class RoleConstants {
	public enum Role {
		ROLE_USER(1l, "User"), ROLE_CLUSTER(2l, "Cluster"), ROLE_ADMIN(3l,
				"Admin"), ROLE_SUPER(4l, "Super");
		private Long id = 0l;
		private String roleName = "";

		private Role(Long id, String roleName) {
			this.id = id;
			this.roleName = roleName;
		}

		public Long getId() {
			return id;
		}

		public String getRoleName() {
			return roleName;
		}
	}



}

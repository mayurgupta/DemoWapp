/**
 * 
 */
package com.trucktrans.services.impl;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashSet;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.lang3.StringEscapeUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailException;
import org.springframework.security.crypto.password.StandardPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationAdapter;
import org.springframework.transaction.support.TransactionSynchronizationManager;

import com.sun.jersey.api.ConflictException;
import com.trucktrans.constants.MessageConstants;
import com.trucktrans.constants.RoleConstants.Role;
import com.trucktrans.dao.IUserDao;
import com.trucktrans.dao.IUserRolesDao;
import com.trucktrans.entity.dto.UserDTO;
import com.trucktrans.entity.dto.UserRoleDTO;
import com.trucktrans.entity.dto.UserRolesId;
import com.trucktrans.entity.dto.UserRolesREF;
import com.trucktrans.entity.web.WPassword;
import com.trucktrans.entity.web.WStatus;
import com.trucktrans.entity.web.WUser;
import com.trucktrans.entity.web.WUserDetails;
import com.trucktrans.exceptions.services.BadRequestException;
import com.trucktrans.exceptions.services.ResourceNotFoundException;
import com.trucktrans.helpers.MailService;
import com.trucktrans.helpers.PwdGenerator;
import com.trucktrans.helpers.Util;
import com.trucktrans.services.IFilterServices;
import com.trucktrans.services.IUserService;
import com.trucktrans.services.PropertiesService;
import com.trucktrans.web.WUserHistory;

/**
 * @author Mayur
 * 10:40:44 pm, 11-Oct-2015
 *
 */
@Service
@Transactional(readOnly = true)
public class UserService implements IUserService{

	private static final Logger LOGGER = Logger
			.getLogger(UserService.class);

	@Autowired
	private IUserDao userDao;

	@Autowired
	private IUserRolesDao rolesDao;

	@Autowired
	private IFilterServices filterServices;
	
	@Autowired
    private MailService mailService;
	
	@Autowired
	private PropertiesService propertyService;

	private static final StandardPasswordEncoder ENCODER = new StandardPasswordEncoder();
	
	@Override
	public WUserDetails getUserByUserName(String userName) {

		UserDTO user = userDao.getByUserName(userName);
		if (user == null) {
			throw new ResourceNotFoundException(userName);
		}

		WUserDetails userDetail = new WUserDetails();
		userDetail.setLogin(user.getUserName());
		userDetail.setScreenName(user.getName());
		userDetail.setEmail(user.getEmail());
		return userDetail;
	}

	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	@Override
	public void update(WUser user) {
		if (user != null && user.getUserName() != null) {
			UserDTO userDto = userDao.getByUserName(user.getUserName());
			if (userDto == null) {
				throw new BadRequestException("unknown user "
						+ user.getUserName());
			}
			// TODO set params what to update??
			userDao.update(userDto);
		}
		throw new BadRequestException("unknown user:" + user);
	}

	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	@Override
	public void delete(String userName) {
		UserDTO user = userDao.getByUserName(userName);
		if (user != null) {
			userDao.delete(user);
		} else {
			throw new ResourceNotFoundException(userName);
		}

	}
	@Override
	public Map<String, Object> getAppInitiationData(UserDTO user,boolean includeCompetitor) {
		

		@SuppressWarnings("unchecked")
		Map<String, Object> userInitFilter = filterServices
				.getAppInitialFilters(user,includeCompetitor);
		Map<String, Object> result = new LinkedHashMap<>();
		WUser wUser = new WUser(user);
		if(user.isPasswordChanged())
		{
			wUser.setPwdChanged(true);
		}
		result.put("userDetail", wUser);
		result.put("initAppData", userInitFilter);
		return result;
	}

	@Override
	public Boolean validateUser(String username, List<Long> hospitalIds) {
		
		return  null;
	}


	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	@Override
	public Long addUser(WUser wUser) {
		validateNewUser(wUser);
		UserDTO userDTO = new UserDTO();
		userDTO.setEnabled(true);
		userDTO.setPassword(ENCODER.encode(wUser.getPassword()));
		userDTO.setUserName(wUser.getUserName());
		userDTO.setEmail(wUser.getEmail());
		userDTO.setName(wUser.getName());
		userDao.save(userDTO);
		// Adding roles to user
		Set<UserRolesREF> auths = getUserRoleRefs(
				getRolesByIds(wUser.getAuths()), userDTO);
		
		userDTO.setUserRolesREFs(auths);
		
		String subject = propertyService.findByPropertyName(
				"forgot.password.subject").getPropertyValue();
		String emailBody = propertyService.findByPropertyName(
				"forgot.password.content").getPropertyValue();
		String passwordKey = String.valueOf(PwdGenerator.generatePswd(8, 15, 2, 1, 1));
		
		String content = StringEscapeUtils.unescapeJava(Util.formatString(emailBody, new Object[] { userDTO.getName(),
				passwordKey }));
		sendMailAfterCommit(userDTO.getEmail(), subject, content);
		return userDao.save(userDTO);
	}

	

	

	private Set<UserRolesREF> getUserRoleRefs(List<UserRoleDTO> roleDTOs,
			UserDTO userDTO) {
		Set<UserRolesREF> userRolesREFs = new HashSet<>();
		UserRolesREF userRolesREF = null;
		UserRolesId userRolesId = null;
		for (UserRoleDTO userRoleDTO : roleDTOs) {
			userRolesREF = new UserRolesREF();
			userRolesId = new UserRolesId();
			userRolesId.setRoleId(userRoleDTO.getRoleId());
			userRolesId.setUserId(userDTO.getUserId());
			userRolesREF.setId(userRolesId);
			userRolesREF.setUserRoleDTO(userRoleDTO);
			userRolesREF.setUserDTO(userDTO);

			userRolesREFs.add(userRolesREF);
		}
		return userRolesREFs;
	}

	// This method can be reused and maybe moved to utility
	private List<UserRoleDTO> getRolesByIds(List<Long> roleIds) {
		List<UserRoleDTO> rolesDTOs = new ArrayList<>();
		UserRoleDTO roleDTO = null;
		if (roleIds != null && roleIds.size() != 0) {
			for (Long l : roleIds) {
				roleDTO = rolesDao.getById(l.longValue());
				if (roleDTO == null) {
					throw new BadRequestException("Unknown authorization :"
							+ l.intValue());
				}
				rolesDTOs.add(roleDTO);
			}
		} else {// setting default role to user if no roles present in wUser
			roleDTO = rolesDao.getById(Role.ROLE_USER.getId());
			rolesDTOs.add(roleDTO);
		}
		return rolesDTOs;
	}

	private boolean validateNewUser(WUser wUser) {
		// Both the passwords should match to make sure this is the password
		// user intend to use
		if (!(wUser.getPassword().equals(wUser.getPassword1()))) {
			throw new BadRequestException(
					MessageConstants.ERROR_ADD_USER_PASSWORD_NOT_MATCHING
							.getVal());
		}
		List<UserDTO> useDTOs = userDao.getAll();

		// Checking if the username provided is already in use
		for (UserDTO userDTO : useDTOs) {
			if (wUser.getUserName().equals(userDTO.getUserName())) {
				throw new ConflictException(
						MessageConstants.ERROR_ADD_USER_DUPLICATE_USERNAME
								.getVal());
			}
		}
		return true;
	}

	@Override
	public void deactivate(String username) {
		UserDTO userDTO = userDao.getByUserName(username);
		if (userDTO == null) {
			throw new ResourceNotFoundException(username);
		}
		userDao.deactivate(userDTO);
	}

	@Override
	public void activate(String username) {
		UserDTO userDTO = userDao.getByUserName(username);
		if (userDTO == null) {
			throw new ResourceNotFoundException(username);
		}
		userDao.activate(userDTO);
	}

	

	

	

	@Override
	public void addRole(String username, List<Long> roleIds) {
		UserDTO userDTO = userDao.getByUserName(username);
		List<Long> copyOfIds = new ArrayList<>(roleIds);
		copyOfIds.removeAll(getRoleIds(userDTO.getUserRolesREFs()));
		if (!copyOfIds.isEmpty()) {
			List<UserRoleDTO> roleDTOs = getRolesByIds(copyOfIds);
			Set<UserRolesREF> userRolesREFs = getUserRoleRefs(roleDTOs, userDTO);
			Set<UserRolesREF> existingUserRoles = userDTO.getUserRolesREFs();
			existingUserRoles.addAll(userRolesREFs);
			userDao.save(userDTO);
		}
	}

	private List<Long> getRoleIds(Set<UserRolesREF> userRolesREFs) {
		List<Long> roleIds = new ArrayList<>();
		for (UserRolesREF userRolesREF : userRolesREFs) {
			roleIds.add(userRolesREF.getUserRoleDTO().getRoleId());
		}
		return roleIds;
	}

	@Override
	public void removeRole(String username, List<Long> roleIds) {
		UserDTO userDTO = userDao.getByUserName(username);
		List<Long> copyOfIds = new ArrayList<>(roleIds);
		Set<UserRolesREF> userRolesREFs = userDTO.getUserRolesREFs();
		Iterator<UserRolesREF> iterator = userRolesREFs.iterator();
		while (iterator.hasNext()) {
			if (copyOfIds.contains(iterator.next().getUserRoleDTO().getRoleId())) {
				iterator.remove();
			}
		}
		userDao.save(userDTO);
	}
	/**
	 * this method updates password for logged in user
	 */
	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	public WStatus changePassword(UserDTO user, WPassword wPassword) {
		WStatus wStatus = new WStatus();
		UserDTO userDto = userDao.getByUserName(user.getUserName());
		if (!validateExistingPassword(wPassword, userDto.getPassword())){
			wStatus.setMessage(MessageConstants.ERROR_EXISTING_PASSWORD_NOT_MATCH.getVal());
			wStatus.setChanged(false);
			return wStatus;
		}
		if (!isUsingExistingPsw(wPassword)){
			wStatus.setMessage(MessageConstants.ERROR_CONFIRM_PASSWORD_NOT_MATCH.getVal());
			wStatus.setChanged(false);
			return wStatus;
		}		
		if (!validateNewPassword(wPassword)){
			wStatus.setMessage(MessageConstants.ERROR_CONFIRM_PASSWORD_NOT_MATCH.getVal());
			wStatus.setChanged(false);
			return wStatus;
		}		
		userDto.setPassword(ENCODER.encode(wPassword.getNewPassword()));
		userDto.setUpdatedBy(user.getUserName());
		userDto.setUpdatedDate(new Timestamp(Calendar.getInstance()
				.getTimeInMillis()));
		userDto.setPasswordChanged(false);

		try {
			userDao.update(userDto);
		} catch (Exception e) {
			LOGGER.error(MessageConstants.FAIL_PASSWORD_CHANGE.getVal(),
					e);
			wStatus.setMessage(MessageConstants.FAIL_PASSWORD_CHANGE.getVal());
			wStatus.setChanged(false);
			return wStatus;
		}
		wStatus.setMessage(MessageConstants.SUCCESS_PASSWORD_CHANGE.getVal());
		wStatus.setChanged(true);
		return wStatus;
	}
	
	private boolean validateNewPassword(WPassword wPassword) {

		if (!wPassword.getNewPassword().equals(
				wPassword.getConfirmPassword())) {
			return false;
		}
		return true;
	}
	
	private boolean validateExistingPassword(WPassword wPassword, String dbPassword){
		if(! ENCODER.matches(wPassword.getOldPassword(), dbPassword))  {
			return false;
		}
		return true;
	}
	private boolean isUsingExistingPsw(WPassword wPassword){
		if(wPassword.getNewPassword().equals(wPassword.getOldPassword()))  {
			return false;
		}
		return true;
	}

	@Override
	@Transactional(readOnly = false, propagation = Propagation.REQUIRES_NEW)
	public WStatus forgotPassword(WPassword wPassword) {
		WStatus wStatus = new WStatus();
		UserDTO user = userDao.getByUserName(wPassword.getUserName());
		if (user != null) {
			if (user.getEmail().equalsIgnoreCase(wPassword.getEmail())) {
				// generate Random password
				// String passwordKey = KeyGenerators.string().generateKey();
				/*
				 * int noOfCAPSAlpha = 1; int noOfDigits = 1; int noOfSplChars =
				 * 1; int minLen = 8; int maxLen = 15;
				 */
				String passwordKey = String.valueOf(PwdGenerator.generatePswd(8, 15, 2, 1, 1));
				String subject = propertyService.findByPropertyName(
						"forgot.password.subject").getPropertyValue();
				String emailBody = propertyService.findByPropertyName(
						"forgot.password.content").getPropertyValue();

				// to add objects middle of content
				String content = StringEscapeUtils.unescapeJava(Util.formatString(emailBody, new Object[] { user.getName(),
								passwordKey }));
				try {
					// update database
					user.setPassword(ENCODER.encode(String.valueOf(passwordKey)));
					user.setUpdatedBy(user.getUserName());
					user.setUpdatedDate(new Timestamp(Calendar.getInstance()
							.getTimeInMillis()));
					user.setPasswordChanged(true);
					sendMailAfterCommit(user.getEmail(), subject, content);
					// user object modified and updated in db when TX completes
					wStatus.setMessage(MessageConstants.PASSWORD_GENERATED
							.getVal());
					wStatus.setChanged(true);
				} catch (MailException e) {
					wStatus.setMessage(MessageConstants.ERROR_IN_SENT_MAIL
							.getVal());
					wStatus.setChanged(false);
					return wStatus;
				}
			} else {
				wStatus.setMessage(MessageConstants.EMAIL_NOT_MATCHED.getVal());
				wStatus.setChanged(false);
			}
		} else {
			wStatus.setMessage(MessageConstants.USER_NAME_NOT_EXISTED.getVal());
			wStatus.setChanged(false);
		}
		return wStatus;
	}
	/**
	 * Method sends email after passwordChanged flag updated in database
	 * @param email
	 * @param subject
	 * @param emailBody
	 */
	@Override
	public void sendMailAfterCommit(final String email,final String subject,final String emailBody) {
		TransactionSynchronizationManager
				.registerSynchronization(new TransactionSynchronizationAdapter() {
					@Override
					public void afterCommit() {
						mailService.sendMail(email,subject,emailBody);
					}
				});
	}

	@Override
	public Object registerUser(WUser wuser) {
		validateNewUser(wuser);
		UserDTO userDTO = new UserDTO();
		userDTO.setEnabled(true);
		userDTO.setPassword(ENCODER.encode(wuser.getPassword()));
		userDTO.setUserName(wuser.getUserName());
		userDTO.setEmail(wuser.getEmail());
		userDTO.setName(wuser.getName());
		String roleDesc = null;
		userDao.save(userDTO);
		// Adding roles to user
		Set<UserRolesREF> auths = getUserRoleRefs(
				getRolesByIds(wuser.getAuths()), userDTO);
		
		// TODO write the proper logic for roles handling
		for (UserRolesREF userRolesREF : auths) {
			if (userRolesREF.getUserRoleDTO().getAuthority()=="ROLE_TRANSPORTER") {
				roleDesc="TRANSPORTER";
				break;
			}
			else if (userRolesREF.getUserRoleDTO().getAuthority()=="ROLE_USER") {
				roleDesc="USER";
			}
		}
		userDTO.setUserRolesREFs(auths);
		
		String subject = propertyService.findByPropertyName(
				"register.user.subject").getPropertyValue();
		String emailBody = propertyService.findByPropertyName(
				"register.user.content").getPropertyValue();
		String passwordKey = String.valueOf(PwdGenerator.generatePswd(8, 15, 2, 1, 1));
		
		String content = StringEscapeUtils.unescapeJava(Util.formatString(emailBody, new Object[] { userDTO.getName(),roleDesc,
				passwordKey }));
		sendMailAfterCommit(userDTO.getEmail(), subject, content);
		return userDao.save(userDTO);
	}
}

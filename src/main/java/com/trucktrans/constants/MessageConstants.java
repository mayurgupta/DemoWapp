package com.trucktrans.constants;

public enum MessageConstants {
	ERROR_ADD_USER_PASSWORD_NOT_MATCHING("error_add_user_password_not_matching"),
	ERROR_ADD_USER_DUPLICATE_USERNAME("error_add_user_duplicate_username"),
	ERROR_EXISTING_PASSWORD_NOT_MATCH("error_existing_password_not_match"),
	ERROR_CONFIRM_PASSWORD_NOT_MATCH("error_confirm_password_not_match"),
	FAIL_PASSWORD_CHANGE("fail_password_change"),
	SUCCESS_PASSWORD_CHANGE("success_password_change"),
	PASSWORD_GENERATED("password_generated"),
	ERROR_IN_SENT_MAIL("error_in_sent_mail"),
	EMAIL_NOT_MATCHED("email_not_matched"),
	USER_NAME_NOT_EXISTED("USER_NAME_NOT_EXISTED");

	private final String val;

	private MessageConstants(String type) {
		this.val = type;
	}

	public String getVal() {
		return val;
	}
}

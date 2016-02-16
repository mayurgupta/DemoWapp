/**
 * 
 */
package com.trucktrans.entity.web;

import java.sql.Timestamp;

/**
 * @author Mayur
 * 10:22:59 pm, 19-Sep-2015
 *
 */
public class WAppTrackInfo {

	
	private String userName;
	private Long userID;
	private Timestamp trackTime;
	private String activity;
	private String activityDesc;
	
	
	public Long getUserID() {
		return userID;
	}
	public void setUserID(Long userID) {
		this.userID = userID;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public Timestamp getTrackTime() {
		return trackTime;
	}
	public void setTrackTime(Timestamp trackTime) {
		this.trackTime = trackTime;
	}
	public String getActivity() {
		return activity;
	}
	public void setActivity(String activity) {
		this.activity = activity;
	}
	public String getActivityDesc() {
		return activityDesc;
	}
	public void setActivityDesc(String activityDesc) {
		this.activityDesc = activityDesc;
	}

}
